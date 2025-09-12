// Supabase Configuration and Authentication Service
class SupabaseAuth {
    constructor() {
        // Updated Supabase credentials
        this.supabaseUrl = 'https://certnmtfowqvnoajwlgx.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcnRubXRmb3dxdm5vYWp3bGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NTgxNTYsImV4cCI6MjA3MzEzNDE1Nn0.Q1jB4j3GIJhQoFGoRV7UhRlthDKUO7J4GumUL6Mkb_M';
        this.supabase = null;
        this.currentUser = null;
        this.pendingDownloadUrl = null;
        this.fallbackMode = false;
        
        // Auto-logout configuration
        this.inactivityTimeout = 10 * 60 * 1000; // 10 minutes in milliseconds
        this.inactivityTimer = null;
        this.lastActivity = Date.now();
        
        // Predefined district credentials for fallback authentication
        this.districtCredentials = {
            'baungondistrict@gmail.com': 'BaungonDistrict12345',
            'libonadistrict@gmail.com': 'LibonaDistrict12345',
            'malitbogdistrict@gmail.com': 'MalitbogDistrict12345',
            'manolodistrict@gmail.com': 'ManoloDistrict12345'
        };
        
        this.init();
    }

    async init() {
        try {
            // Load Supabase from CDN
            if (typeof supabase === 'undefined') {
                await this.loadSupabaseScript();
            }
            
            // Initialize Supabase client
            this.supabase = supabase.createClient(this.supabaseUrl, this.supabaseKey);
            
            // Test Supabase connection
            await this.testSupabaseConnection();
            
            if (!this.fallbackMode) {
                // Check if user is already logged in via Supabase
                const { data: { session } } = await this.supabase.auth.getSession();
                if (session?.user) {
                    this.currentUser = session.user;
                    this.updateUIForLoggedInUser();
                    // Start inactivity timer for existing session
                    this.initInactivityTimer();
                }

                // Listen for auth changes
                this.supabase.auth.onAuthStateChange((event, session) => {
                    if (event === 'SIGNED_IN' && session) {
                        this.currentUser = session.user;
                        this.updateUIForLoggedInUser();
                        this.handleSuccessfulLogin();
                    } else if (event === 'SIGNED_OUT') {
                        this.currentUser = null;
                        this.updateUIForLoggedOutUser();
                    }
                });
            } else {
                // Check for existing fallback session
                this.checkFallbackSession();
            }

        } catch (error) {
            console.error('Failed to initialize Supabase, switching to fallback mode:', error);
            this.fallbackMode = true;
            this.checkFallbackSession();
        }
    }

    async testSupabaseConnection() {
        try {
            // Test with a simple request
            const { data, error } = await this.supabase.auth.getSession();
            if (error && error.message.includes('pause')) {
                throw new Error('Supabase project is paused');
            }
        } catch (error) {
            console.warn('Supabase connection test failed, enabling fallback mode');
            this.fallbackMode = true;
            throw error;
        }
    }

    checkFallbackSession() {
        // Check if user is logged in via fallback mode
        const savedUser = localStorage.getItem('als_fallback_user');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.updateUIForLoggedInUser();
                // Start inactivity timer for existing session
                this.initInactivityTimer();
                console.log('Restored fallback session for:', this.getDistrictDisplayName(this.currentUser.email));
            } catch (error) {
                console.error('Error restoring fallback session:', error);
                localStorage.removeItem('als_fallback_user');
            }
        } else {
            this.updateUIForLoggedOutUser();
        }
    }

    async loadSupabaseScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/dist/umd/supabase.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Auto-logout functionality
    initInactivityTimer() {
        // Events that count as user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        
        // Reset the timer on any activity
        const resetTimer = () => {
            this.lastActivity = Date.now();
            this.resetInactivityTimer();
        };

        // Add event listeners for user activity
        events.forEach(event => {
            document.addEventListener(event, resetTimer, true);
        });

        // Start the initial timer
        this.resetInactivityTimer();
    }

    resetInactivityTimer() {
        // Clear existing timer
        if (this.inactivityTimer) {
            clearTimeout(this.inactivityTimer);
        }

        // Set new timer
        this.inactivityTimer = setTimeout(() => {
            this.handleInactivityLogout();
        }, this.inactivityTimeout);
    }

    async handleInactivityLogout() {
        if (this.currentUser) {
            console.log('Auto-logout due to inactivity');
            
            // Show warning before logout
            const shouldLogout = confirm(
                'You have been inactive for 10 minutes. You will be logged out for security reasons.\n\n' +
                'Click OK to logout now, or Cancel to stay logged in.'
            );

            if (shouldLogout) {
                await this.signOut();
                alert('You have been logged out due to inactivity. Please log in again to continue.');
            } else {
                // User chose to stay, reset the timer
                this.resetInactivityTimer();
            }
        }
    }

    stopInactivityTimer() {
        if (this.inactivityTimer) {
            clearTimeout(this.inactivityTimer);
            this.inactivityTimer = null;
        }
    }

    async signIn(email, password) {
        try {
            console.log('Attempting to sign in with:', email, 'Fallback mode:', this.fallbackMode);
            
            // Try fallback authentication first if in fallback mode or Supabase fails
            if (this.fallbackMode || !this.supabase) {
                return this.fallbackSignIn(email, password);
            }

            // Try Supabase authentication
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            console.log('Supabase response:', { data: data ? 'received' : 'null', error });

            if (error) {
                // If Supabase fails, try fallback authentication
                console.warn('Supabase auth failed, trying fallback:', error.message);
                return this.fallbackSignIn(email, password);
            }

            if (!data || !data.user) {
                // If no user data, try fallback authentication
                console.warn('No user data from Supabase, trying fallback');
                return this.fallbackSignIn(email, password);
            }

            console.log('Supabase login successful for user:', data.user.email);
            return { success: true, user: data.user };
            
        } catch (error) {
            console.error('Supabase sign in error, trying fallback:', error);
            return this.fallbackSignIn(email, password);
        }
    }

    fallbackSignIn(email, password) {
        try {
            console.log('Attempting fallback authentication for:', email);
            
            // Check if credentials match predefined district credentials
            if (this.districtCredentials[email] && this.districtCredentials[email] === password) {
                // Create a mock user object
                const mockUser = {
                    email: email,
                    id: `fallback_${email}`,
                    created_at: new Date().toISOString(),
                    user_metadata: {
                        district: this.getDistrictDisplayName(email)
                    }
                };
                
                this.currentUser = mockUser;
                
                // Save to localStorage for persistence
                localStorage.setItem('als_fallback_user', JSON.stringify(mockUser));
                localStorage.setItem('als_fallback_session', Date.now().toString());
                
                // Update UI
                this.updateUIForLoggedInUser();
                
                console.log('Fallback login successful for:', this.getDistrictDisplayName(email));
                
                // Trigger success handling
                setTimeout(() => {
                    this.handleSuccessfulLogin();
                }, 100);
                
                return { success: true, user: mockUser };
            } else {
                return { 
                    success: false, 
                    error: 'Invalid district or password. Please check your credentials.' 
                };
            }
        } catch (error) {
            console.error('Fallback authentication error:', error);
            return { 
                success: false, 
                error: 'Authentication failed. Please try again.' 
            };
        }
    }

    async signOut() {
        try {
            // Stop inactivity timer
            this.stopInactivityTimer();
            
            // Handle fallback mode logout
            if (this.fallbackMode || !this.supabase) {
                return this.fallbackSignOut();
            }

            // Try Supabase logout first
            const { error } = await this.supabase.auth.signOut();
            if (error) {
                console.warn('Supabase logout failed, using fallback:', error.message);
                return this.fallbackSignOut();
            }
            
            // Also clear fallback session in case it exists
            this.clearFallbackSession();
            
            return { success: true };
        } catch (error) {
            console.error('Supabase sign out error, using fallback:', error);
            return this.fallbackSignOut();
        }
    }

    fallbackSignOut() {
        try {
            // Stop inactivity timer
            this.stopInactivityTimer();
            
            // Clear current user
            this.currentUser = null;
            
            // Clear localStorage
            this.clearFallbackSession();
            
            // Update UI
            this.updateUIForLoggedOutUser();
            
            console.log('Fallback logout successful');
            return { success: true };
        } catch (error) {
            console.error('Fallback logout error:', error);
            return { success: false, error: 'Logout failed. Please try again.' };
        }
    }

    clearFallbackSession() {
        localStorage.removeItem('als_fallback_user');
        localStorage.removeItem('als_fallback_session');
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    showLoginModal(downloadUrl) {
        this.pendingDownloadUrl = downloadUrl;
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('hidden');
            // Focus on email input
            setTimeout(() => {
                const emailInput = document.getElementById('email');
                if (emailInput) emailInput.focus();
            }, 100);
        }
    }

    hideLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.clearLoginForm();
    }

    clearLoginForm() {
        const form = document.getElementById('loginForm');
        if (form) form.reset();
        
        this.hideLoginError();
        this.hideLoginSuccess();
        this.hideLoginSpinner();
    }

    showLoginError(message) {
        const errorDiv = document.getElementById('loginError');
        const errorText = document.getElementById('loginErrorText');
        if (errorDiv && errorText) {
            errorText.textContent = message;
            errorDiv.classList.remove('hidden');
        }
    }

    hideLoginError() {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
    }

    showLoginSuccess() {
        const successDiv = document.getElementById('loginSuccess');
        if (successDiv) {
            successDiv.classList.remove('hidden');
        }
    }

    hideLoginSuccess() {
        const successDiv = document.getElementById('loginSuccess');
        if (successDiv) {
            successDiv.classList.add('hidden');
        }
    }

    showLoginSpinner() {
        const spinner = document.getElementById('loginSpinner');
        const buttonText = document.getElementById('loginButtonText');
        const button = document.getElementById('loginButton');
        
        if (spinner) spinner.classList.remove('hidden');
        if (buttonText) buttonText.textContent = 'Signing In...';
        if (button) button.disabled = true;
    }

    hideLoginSpinner() {
        const spinner = document.getElementById('loginSpinner');
        const buttonText = document.getElementById('loginButtonText');
        const button = document.getElementById('loginButton');
        
        if (spinner) spinner.classList.add('hidden');
        if (buttonText) buttonText.textContent = 'Sign In';
        if (button) button.disabled = false;
    }

    handleSuccessfulLogin() {
        this.showLoginSuccess();
        
        // Start inactivity timer for auto-logout
        this.initInactivityTimer();
        
        setTimeout(() => {
            if (this.pendingDownloadUrl) {
                // Proceed with download
                window.open(this.pendingDownloadUrl, '_blank');
                this.pendingDownloadUrl = null;
            }
            this.hideLoginModal();
        }, 2000);
    }

    updateUIForLoggedInUser() {
        // Show user info and logout button, hide login button
        const headerUserInfo = document.getElementById('headerUserInfo');
        const headerLoginBtn = document.getElementById('headerLoginBtn');
        const headerUserEmail = document.getElementById('headerUserEmail');
        const mobileUserInfo = document.getElementById('mobileUserInfo');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const mobileUserEmail = document.getElementById('mobileUserEmail');
        
        if (this.currentUser && this.currentUser.email) {
            // Convert email to district name for display
            const districtName = this.getDistrictDisplayName(this.currentUser.email);
            const displayName = this.fallbackMode ? `${districtName} (Offline)` : districtName;
            
            // Desktop
            if (headerUserInfo) headerUserInfo.classList.remove('hidden');
            if (headerLoginBtn) headerLoginBtn.classList.add('hidden');
            if (headerUserEmail) headerUserEmail.textContent = displayName;
            
            // Mobile
            if (mobileUserInfo) mobileUserInfo.classList.remove('hidden');
            if (mobileLoginBtn) mobileLoginBtn.classList.add('hidden');
            if (mobileUserEmail) mobileUserEmail.textContent = displayName;
            
            // Add offline indicator styling if in fallback mode
            if (this.fallbackMode) {
                if (headerUserEmail) headerUserEmail.style.color = '#f59e0b'; // amber-500
                if (mobileUserEmail) mobileUserEmail.style.color = '#f59e0b';
            }
            
            console.log('UI updated for logged in user:', displayName);
        }
    }

    updateUIForLoggedOutUser() {
        // Hide user info and logout button, show login button
        const headerUserInfo = document.getElementById('headerUserInfo');
        const headerLoginBtn = document.getElementById('headerLoginBtn');
        const mobileUserInfo = document.getElementById('mobileUserInfo');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        
        // Desktop
        if (headerUserInfo) headerUserInfo.classList.add('hidden');
        if (headerLoginBtn) headerLoginBtn.classList.remove('hidden');
        
        // Mobile
        if (mobileUserInfo) mobileUserInfo.classList.add('hidden');
        if (mobileLoginBtn) mobileLoginBtn.classList.remove('hidden');
        
        // Reset any special styling
        const headerUserEmail = document.getElementById('headerUserEmail');
        const mobileUserEmail = document.getElementById('mobileUserEmail');
        if (headerUserEmail) headerUserEmail.style.color = '';
        if (mobileUserEmail) mobileUserEmail.style.color = '';
        
        console.log('UI updated for logged out user');
    }

    getDistrictDisplayName(email) {
        const districtMap = {
            'baungondistrict@gmail.com': 'Baungon District',
            'libonadistrict@gmail.com': 'Libona District',
            'malitbogdistrict@gmail.com': 'Malitbog District',
            'manolodistrict@gmail.com': 'Manolo Fortich District'
        };
        return districtMap[email] || email;
    }

    // Handle download button clicks
    handleDownloadClick(event, downloadUrl) {
        event.preventDefault();
        
        if (this.isAuthenticated()) {
            // User is logged in, proceed with download
            window.open(downloadUrl, '_blank');
        } else {
            // User is not logged in, show modal
            this.showLoginModal(downloadUrl);
        }
    }
}

// Initialize the authentication service
const authService = new SupabaseAuth();

// Authentication event handlers
document.addEventListener('DOMContentLoaded', function() {
    // Wait for components to load before setting up event listeners
    setTimeout(() => {
        setupAuthEventListeners();
    }, 500);
});

function setupAuthEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(loginForm);
            const district = formData.get('district') || document.getElementById('district')?.value;
            const password = formData.get('password') || document.getElementById('password')?.value;
            
            console.log('Login attempt:', { district: district ? 'provided' : 'missing', password: password ? 'provided' : 'missing' });
            
            // Validate inputs
            if (!district || !district.trim()) {
                authService.showLoginError('Please select your district.');
                return;
            }
            
            if (!password || !password.trim()) {
                authService.showLoginError('Please enter your password.');
                return;
            }
            
            // Clear previous errors and show loading
            authService.hideLoginError();
            authService.showLoginSpinner();
            
            try {
                // Use district value as email (it contains the email address)
                const result = await authService.signIn(district.trim(), password);
                
                authService.hideLoginSpinner();
                
                if (result.success) {
                    // Success is handled by the auth state change listener
                    console.log('Login successful');
                } else {
                    console.error('Login failed:', result.error);
                    authService.showLoginError(result.error || 'Invalid district or password. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                authService.hideLoginSpinner();
                authService.showLoginError('An error occurred during login. Please try again.');
            }
        });
    }

    // Show/Hide Password Toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.getElementById('passwordIcon');
    
    if (togglePassword && passwordInput && passwordIcon) {
        togglePassword.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.classList.remove('fa-eye');
                passwordIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordIcon.classList.remove('fa-eye-slash');
                passwordIcon.classList.add('fa-eye');
            }
        });
    }

    // Close modal button
    const closeModalBtn = document.getElementById('closeLoginModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            authService.hideLoginModal();
        });
    }

    // Close modal when clicking outside
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                authService.hideLoginModal();
            }
        });
    }

    // Header Login Button
    const headerLoginBtn = document.getElementById('headerLoginBtn');
    if (headerLoginBtn) {
        headerLoginBtn.addEventListener('click', () => {
            authService.showLoginModal(null);
        });
    }

    // Mobile Login Button
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', () => {
            authService.showLoginModal(null);
        });
    }

    // Header Logout Button
    const headerLogoutBtn = document.getElementById('headerLogoutBtn');
    if (headerLogoutBtn) {
        headerLogoutBtn.addEventListener('click', async () => {
            await authService.signOut();
        });
    }

    // Mobile Logout Button
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', async () => {
            await authService.signOut();
        });
    }

    // Intercept all download button clicks
    interceptDownloadButtons();
}

function interceptDownloadButtons() {
    // Find all download buttons and add event listeners
    const downloadButtons = document.querySelectorAll('a[href*="drive.google.com"], a[href*="docs.google.com"]');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const downloadUrl = button.href;
            authService.handleDownloadClick(e, downloadUrl);
        });
    });
}

// Expose global function for manual triggering
window.showLoginModal = function(downloadUrl) {
    authService.showLoginModal(downloadUrl);
};

window.authService = authService;

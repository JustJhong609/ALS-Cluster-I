// Supabase Configuration and Authentication Service
class SupabaseAuth {
    constructor() {
        this.supabaseUrl = 'https://wqgtwawhychppihoeedf.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxZ3R3YXdoeWNocHBpaG9lZWRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMDg3NDcsImV4cCI6MjA3Mjc4NDc0N30.LnWuNXlbQ-2VcykA1cm91YqMaduNSy4EXvH__gE3Th0';
        this.supabase = null;
        this.currentUser = null;
        this.pendingDownloadUrl = null;
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
            
            // Check if user is already logged in
            const { data: { session } } = await this.supabase.auth.getSession();
            if (session?.user) {
                this.currentUser = session.user;
                this.updateUIForLoggedInUser();
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

        } catch (error) {
            console.error('Failed to initialize Supabase:', error);
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

    async signIn(email, password) {
        try {
            console.log('Attempting to sign in with:', email);
            
            // Check if Supabase is initialized
            if (!this.supabase) {
                throw new Error('Supabase client not initialized');
            }

            const { data, error } = await this.supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            console.log('Supabase response:', { data: data ? 'received' : 'null', error });

            if (error) {
                throw error;
            }

            if (!data || !data.user) {
                throw new Error('No user data returned from login');
            }

            console.log('Login successful for user:', data.user.email);
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Sign in error:', error);
            
            // Handle specific error types
            let errorMessage = error.message;
            if (error.message.includes('Invalid login credentials')) {
                errorMessage = 'Invalid email or password. Please check your credentials.';
            } else if (error.message.includes('Email not confirmed')) {
                errorMessage = 'Please confirm your email address before signing in.';
            } else if (error.message.includes('Too many requests')) {
                errorMessage = 'Too many login attempts. Please try again later.';
            }
            
            return { success: false, error: errorMessage };
        }
    }

    async signOut() {
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
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
            // Desktop
            if (headerUserInfo) headerUserInfo.classList.remove('hidden');
            if (headerLoginBtn) headerLoginBtn.classList.add('hidden');
            if (headerUserEmail) headerUserEmail.textContent = this.currentUser.email;
            
            // Mobile
            if (mobileUserInfo) mobileUserInfo.classList.remove('hidden');
            if (mobileLoginBtn) mobileLoginBtn.classList.add('hidden');
            if (mobileUserEmail) mobileUserEmail.textContent = this.currentUser.email;
            
            console.log('UI updated for logged in user:', this.currentUser.email);
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
        
        console.log('UI updated for logged out user');
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
            const email = formData.get('email') || document.getElementById('email')?.value;
            const password = formData.get('password') || document.getElementById('password')?.value;
            
            console.log('Login attempt:', { email: email ? 'provided' : 'missing', password: password ? 'provided' : 'missing' });
            
            // Validate inputs
            if (!email || !email.trim()) {
                authService.showLoginError('Please enter your email address.');
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
                const result = await authService.signIn(email.trim(), password);
                
                authService.hideLoginSpinner();
                
                if (result.success) {
                    // Success is handled by the auth state change listener
                    console.log('Login successful');
                } else {
                    console.error('Login failed:', result.error);
                    authService.showLoginError(result.error || 'Invalid email or password. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                authService.hideLoginSpinner();
                authService.showLoginError('An error occurred during login. Please try again.');
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

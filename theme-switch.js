/**
 * OmniBazaar Theme Switch Utility
 * 
 * This JavaScript utility provides theme switching functionality for HTML mockups.
 * It mirrors the functionality of the React ThemeProvider component.
 * 
 * Features:
 * - Light and dark theme switching
 * - System preference detection
 * - Local storage persistence
 * - Smooth transitions
 * - Keyboard accessibility
 */

class OmniBazaarThemeSwitch {
  constructor() {
    this.storageKey = 'omnibazaar-theme-mode';
    this.currentTheme = this.getInitialTheme();
    this.init();
  }

  /**
   * Gets the initial theme based on stored preference or system preference
   * @returns {string} 'light' or 'dark'
   */
  getInitialTheme() {
    // Check localStorage first
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    // Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  /**
   * Applies the theme by updating the document class
   * @param {string} theme - 'light' or 'dark'
   */
  applyTheme(theme) {
    // Remove existing theme classes
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.body.classList.remove('theme-light', 'theme-dark');

    // Add new theme class
    document.documentElement.classList.add(`theme-${theme}`);
    document.body.classList.add(`theme-${theme}`);

    // Store preference
    localStorage.setItem(this.storageKey, theme);

    // Update theme switch button if it exists
    this.updateThemeSwitchButton(theme);

    this.currentTheme = theme;
  }

  /**
   * Toggles between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);

    // Announce theme change for screen readers
    this.announceThemeChange(newTheme);
  }

  /**
   * Updates the theme switch button appearance
   * @param {string} theme - Current theme
   */
  updateThemeSwitchButton(theme) {
    const button = document.getElementById('theme-switch-btn');
    if (button) {
      const icon = button.querySelector('.theme-icon');
      const label = button.querySelector('.theme-label');

      if (icon) {
        icon.textContent = theme === 'light' ? '🌙' : '☀️';
      }

      if (label) {
        label.textContent = theme === 'light' ? 'Dark mode' : 'Light mode';
      }

      button.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
      button.title = `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`;
    }
  }

  /**
   * Announces theme change for screen readers
   * @param {string} newTheme - The new theme
   */
  announceThemeChange(newTheme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = `Switched to ${newTheme} theme`;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Creates and inserts the theme switch button
   */
  createThemeSwitchButton() {
    // Check if button already exists
    if (document.getElementById('theme-switch-btn')) {
      return;
    }

    const button = document.createElement('button');
    button.id = 'theme-switch-btn';
    button.className = 'theme-switch';
    button.setAttribute('aria-label', `Switch to ${this.currentTheme === 'light' ? 'dark' : 'light'} theme`);
    button.title = `Switch to ${this.currentTheme === 'light' ? 'dark' : 'light'} theme`;

    const icon = document.createElement('span');
    icon.className = 'theme-icon';
    icon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';

    button.appendChild(icon);

    // Add click event listener
    button.addEventListener('click', () => this.toggleTheme());

    // Add keyboard event listener
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    // Insert button into document
    document.body.appendChild(button);
  }

  /**
   * Listens for system theme changes
   */
  listenForSystemThemeChanges() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem(this.storageKey)) {
          const newTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(newTheme);
        }
      });
    }
  }

  /**
   * Initializes the theme system
   */
  init() {
    // Apply initial theme
    this.applyTheme(this.currentTheme);

    // Create theme switch button
    this.createThemeSwitchButton();

    // Listen for system theme changes
    this.listenForSystemThemeChanges();

    // Listen for storage changes (for sync across tabs)
    window.addEventListener('storage', (e) => {
      if (e.key === this.storageKey && e.newValue) {
        this.applyTheme(e.newValue);
      }
    });
  }
}

// Utility functions for manual theme management
window.OmniBazaarTheme = {
  /**
   * Sets the theme manually
   * @param {string} theme - 'light' or 'dark'
   */
  setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      if (window.themeSwitch) {
        window.themeSwitch.applyTheme(theme);
      }
    }
  },

  /**
   * Gets the current theme
   * @returns {string} Current theme ('light' or 'dark')
   */
  getTheme() {
    return window.themeSwitch ? window.themeSwitch.currentTheme : 'light';
  },

  /**
   * Toggles the current theme
   */
  toggleTheme() {
    if (window.themeSwitch) {
      window.themeSwitch.toggleTheme();
    }
  }
};

// Initialize theme system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.themeSwitch = new OmniBazaarThemeSwitch();
});

// Also initialize if script is loaded after DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.themeSwitch) {
      window.themeSwitch = new OmniBazaarThemeSwitch();
    }
  });
} else {
  if (!window.themeSwitch) {
    window.themeSwitch = new OmniBazaarThemeSwitch();
  }
}

// Export for ES modules (if used)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OmniBazaarThemeSwitch;
}

// AMD support
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return OmniBazaarThemeSwitch;
  });
}
/**
 * ============================================================================
 * ANGELO VARGHESE — PROFESSIONAL PORTFOLIO JAVASCRIPT
 * Modern, Dependency-Free Vanilla JavaScript
 * Features: Mobile Nav, Scroll Reveal, Active Nav Highlight, Project Modals,
 * Form Validation, Copy to Clipboard, Accessible Dialog Handling.
 * ============================================================================
 */

(function () {
  'use strict';

  // --- Project Data Store ---
  const PROJECT_DATA = {
    expenseai: {
      title: "ExpenseAI",
      subtitle: "AI-Powered Personal Expense Analysis System",
      domain: "Data Science & Machine Learning",
      description: "A comprehensive personal expense analysis application engineered to record, categorize, monitor, and uncover spending patterns through automated data processing and machine learning algorithms.",
      features: [
        "Granular expense tracking and transaction management with clean schema validation.",
        "Automatic expense categorization powered by Scikit-learn classification models.",
        "Monthly, weekly, and category-wise spending trend analysis.",
        "Interactive spending visualizations and statistical breakdowns.",
        "Statistical anomaly detection for unusual spending surges and duplicate transactions.",
        "Expense forecasting models estimating future monthly expenditure based on moving trends."
      ],
      technologies: ["Python", "Flask", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
      githubUrl: "https://github.com/angelotech07-afk"
    },
    sahayai: {
      title: "SahayAI",
      subtitle: "AI-Powered Multilingual Government Scheme & Grievance Assistant",
      domain: "Natural Language Processing & Public Welfare AI",
      description: "An AI-powered public assistance system designed to democratize access to welfare schemes and streamline citizen grievances through intelligent multilingual interaction and contextual profile extraction.",
      features: [
        "Multilingual text interaction designed for accessibility across regional languages.",
        "Automated user profile extraction from natural conversational inputs.",
        "Intelligent scheme recommendation engine tailored to user socio-economic demographics.",
        "Eligibility-based matching algorithm evaluating eligibility criteria in real time.",
        "Structured grievance intake, classification, and relevant authority redirection guidance."
      ],
      technologies: ["Python", "FastAPI", "NLP", "AI", "SQLite"],
      githubUrl: "https://github.com/angelotech07-afk"
    },
    culturegame: {
      title: "Culture Game",
      subtitle: "Interactive Indian History Learning Game",
      domain: "Educational Gamification & Full-Stack Web",
      description: "An educational gaming project designed to make Indian history more engaging, memorable, and interactive through chapter-based narrative gameplay, progressive knowledge challenges, and gamified reward feedback.",
      features: [
        "Chapter-based historical narrative progression across distinct Indian eras.",
        "Interactive historical challenges, scenario dilemmas, and knowledge checks.",
        "Gamified XP, badge rewards, and milestone achievements.",
        "Curated educational historical storytelling designed for learner retention.",
        "Player score tracking, leaderboards, and interactive quiz feedback."
      ],
      technologies: ["Python", "FastAPI", "SQLite", "JavaScript"],
      githubUrl: "https://github.com/angelotech07-afk"
    }
  };

  /**
   * 1. Mobile Menu Toggle & Navigation
   */
  function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const siteNav = document.getElementById('site-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !siteNav) return;

    function toggleMenu(forceState) {
      const isOpen = typeof forceState === 'boolean' 
        ? forceState 
        : !siteNav.classList.contains('open');

      siteNav.classList.toggle('open', isOpen);
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    }

    menuToggle.addEventListener('click', () => toggleMenu());

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('open')) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (siteNav.classList.contains('open') && !siteNav.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  /**
   * 2. Active Section Highlighting
   */
  function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks)
      .map((link) => {
        const href = link.getAttribute('href');
        return href && href.startsWith('#') ? document.querySelector(href) : null;
      })
      .filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const matches = link.getAttribute('href') === `#${currentId}`;
              link.classList.toggle('active', matches);
            });
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px'
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /**
   * 3. Scroll Reveal Animations (Respecting Reduced Motion)
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /**
   * 4. Project Details Dialog / Modal
   */
  function initProjectModals() {
    const dialog = document.getElementById('project-dialog');
    const triggers = document.querySelectorAll('.project-modal-trigger');
    const closeBtn = document.getElementById('dialog-close-btn');
    const dismissBtn = document.getElementById('dialog-dismiss-btn');

    if (!dialog) return;

    const domainEl = document.getElementById('dialog-domain');
    const titleEl = document.getElementById('dialog-title');
    const subtitleEl = document.getElementById('dialog-subtitle');
    const descEl = document.getElementById('dialog-description');
    const featuresEl = document.getElementById('dialog-features');
    const techEl = document.getElementById('dialog-tech');
    const githubBtn = document.getElementById('dialog-github-btn');

    function openModal(projectId) {
      const data = PROJECT_DATA[projectId];
      if (!data) return;

      if (domainEl) domainEl.textContent = data.domain;
      if (titleEl) titleEl.textContent = data.title;
      if (subtitleEl) subtitleEl.textContent = data.subtitle;
      if (descEl) descEl.textContent = data.description;

      if (featuresEl) {
        featuresEl.innerHTML = data.features
          .map((feat) => `<li>${feat}</li>`)
          .join('');
      }

      if (techEl) {
        techEl.innerHTML = data.technologies
          .map((tech) => `<span class="tech-pill">${tech}</span>`)
          .join('');
      }

      if (githubBtn) {
        githubBtn.href = data.githubUrl;
      }

      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    }

    function closeModal() {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const projId = trigger.getAttribute('data-project');
        openModal(projId);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

    // Light dismiss: Click outside content to close (from modern-web-guidance)
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeModal();
      }
    });
  }

  /**
   * 5. Toast Notification System
   */
  function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, duration);
  }

  /**
   * 6. Copy Email to Clipboard
   */
  function initCopyEmail() {
    const copyBtns = document.querySelectorAll('.copy-email-btn');

    copyBtns.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const email = btn.getAttribute('data-email') || 'angelovarghese609@gmail.com';
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(email);
            showToast(`Copied ${email} to clipboard!`);
          } else {
            // Fallback for older browsers
            const temp = document.createElement('textarea');
            temp.value = email;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            showToast(`Copied ${email} to clipboard!`);
          }
        } catch (err) {
          showToast(`Email: ${email}`);
        }
      });
    });
  }

  /**
   * 7. Contact Form Handling & Validation
   * Accurately prepares an email draft via mailto: without falsely claiming server delivery.
   */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    if (!form || !feedback) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    function clearErrors() {
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (subjectError) subjectError.textContent = '';
      if (messageError) messageError.textContent = '';
      feedback.className = 'form-feedback-panel';
      feedback.textContent = '';
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Name validation
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        if (nameError) nameError.textContent = 'Please enter your name (at least 2 characters).';
        isValid = false;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Subject validation
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
        if (subjectError) subjectError.textContent = 'Please enter a subject (at least 3 characters).';
        isValid = false;
      }

      // Message validation
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        if (messageError) messageError.textContent = 'Please enter your message (at least 10 characters).';
        isValid = false;
      }

      if (!isValid) {
        feedback.className = 'form-feedback-panel error active';
        feedback.textContent = 'Please correct the highlighted fields before submitting.';
        return;
      }

      // Construct mailto link
      const recipient = 'angelovarghese609@gmail.com';
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
      const body = encodeURIComponent(
        `Hi Angelo,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}\n\nSent from your portfolio website.`
      );
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      // Show honest feedback panel
      feedback.className = 'form-feedback-panel success active';
      feedback.innerHTML = `
        <strong>Email draft prepared!</strong><br />
        Opening your email client to send to <code>angelovarghese609@gmail.com</code>.<br />
        If your client didn't open automatically, <a href="${mailtoUrl}" style="color: #38bdf8; text-decoration: underline;">click here to launch it</a>, or email directly.
      `;

      // Trigger mailto client
      window.location.href = mailtoUrl;

      // Optional form reset after short delay
      setTimeout(() => {
        form.reset();
      }, 1500);
    });
  }

  /**
   * 8. Initialize Everything on DOMContentLoaded
   */
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initActiveNav();
    initScrollReveal();
    initProjectModals();
    initCopyEmail();
    initContactForm();

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'instant' });
      }
    }
  });
})();

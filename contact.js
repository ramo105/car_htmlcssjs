/* ========================================
   CONTACT PAGE JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // FILE UPLOAD
    // ========================================
    const fileInput = document.getElementById('cv');
    const fileName = document.getElementById('file-name');
    
    if (fileInput && fileName) {
        fileInput.addEventListener('change', function(e) {
            if (this.files && this.files.length > 0) {
                const file = this.files[0];
                const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
                
                // Vérifier la taille (max 5MB)
                if (fileSize > 5) {
                    alert('Le fichier est trop volumineux. Taille maximale : 5MB');
                    this.value = '';
                    fileName.textContent = '';
                    return;
                }
                
                fileName.textContent = `${file.name} (${fileSize} MB)`;
            } else {
                fileName.textContent = '';
            }
        });
    }
    
    // ========================================
    // FORM VALIDATION & SUBMISSION
    // ========================================
    const form = document.getElementById('join-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation des champs
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation du téléphone marocain
            const phoneRegex = /^(\+212|0)[5-7]\d{8}$/;
            if (!phoneRegex.test(data.telephone.replace(/\s/g, ''))) {
                showMessage('Veuillez entrer un numéro de téléphone marocain valide', 'error');
                return;
            }
            
            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Vérifier si RGPD est coché
            if (!data.rgpd) {
                showMessage('Vous devez accepter la politique de confidentialité', 'error');
                return;
            }
            
            // Simulation d'envoi (à remplacer par vraie soumission)
            submitForm(formData);
        });
    }
    
    function submitForm(formData) {
        // Afficher un loader sur le bouton
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Envoi en cours...</span>';
        
        // Simulation d'envoi (à remplacer par fetch/AJAX vers backend)
        setTimeout(() => {
            // Succès
            showMessage('Votre candidature a été envoyée avec succès ! Nous vous contacterons bientôt.', 'success');
            form.reset();
            document.getElementById('file-name').textContent = '';
            
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
            
            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
    }
    
    function showMessage(message, type) {
        // Supprimer les messages existants
        const existingMsg = document.querySelector('.form-message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        // Créer le message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message--${type}`;
        messageDiv.textContent = message;
        
        // Ajouter avant le formulaire
        const formWrapper = document.querySelector('.contact-form__wrapper');
        formWrapper.insertBefore(messageDiv, formWrapper.firstChild);
        
        // Scroll vers le message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            messageDiv.classList.add('fade-out');
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#/') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // INPUT FORMATTING
    // ========================================
    
    // Format téléphone automatiquement
    const phoneInput = document.getElementById('telephone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            // Si commence par 0, formater en groupes
            if (value.startsWith('0')) {
                if (value.length > 10) value = value.slice(0, 10);
                if (value.length > 1) {
                    value = value.replace(/(\d{1})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6');
                }
            }
            // Si commence par +212
            else if (value.startsWith('212')) {
                if (value.length > 12) value = value.slice(0, 12);
                value = '+' + value.replace(/(\d{3})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6');
            }
            
            this.value = value;
        });
    }
    
    // Capitaliser première lettre nom/prénom
    ['nom', 'prenom'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('blur', function() {
                this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase();
            });
        }
    });
    
    // ========================================
    // ANIMATION ON SCROLL
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Éléments à animer
    document.querySelectorAll('.contact-info__card, .contact-hours__card, .form__group').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// STYLES POUR LES MESSAGES
// ========================================
const messageStyles = document.createElement('style');
messageStyles.textContent = `
    .form-message {
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        font-weight: 600;
        text-align: center;
        animation: slideDown 0.3s ease;
    }
    
    .form-message--success {
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        color: #22c55e;
    }
    
    .form-message--error {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
    }
    
    .form-message.fade-out {
        animation: fadeOut 0.3s ease forwards;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(messageStyles);
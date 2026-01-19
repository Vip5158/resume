
        // Initialize jsPDF
        window.jsPDF = window.jspdf.jsPDF;

        // Global variables
        let currentBiodataStep = 1;
        let biodataData = {
            theme: 'maroon-gold',
            template: 'template-1',
            photo: null,
            personal: {},
            family: {
                siblings: []
            },
            education: [],
            hobbies: [],
            languages: [],
            contact: {},
            expectations: "",
            annualIncome: ""
        };

        let resumeData = {
            theme: 'blue-gold',
            template: 'template-1',
            photo: null,
            personal: {},
            experience: [],
            education: [],
            skills: [],
            languages: [],
            summary: ""
        };

        // Color Themes
        const biodataThemes = [
            {
                id: 'maroon-gold',
                name: 'Maroon & Gold',
                colors: {
                    primary: '#800000',
                    secondary: '#D4AF37',
                    accent: '#F8E9E9',
                    text: '#333333',
                    light: '#FFF5F5'
                }
            },
            {
                id: 'royal-blue',
                name: 'Royal Blue',
                colors: {
                    primary: '#1a3c6e',
                    secondary: '#D4AF37',
                    accent: '#e8f0fe',
                    text: '#333333',
                    light: '#F0F8FF'
                }
            },
            {
                id: 'green-gold',
                name: 'Green & Gold',
                colors: {
                    primary: '#2E8B57',
                    secondary: '#D4AF37',
                    accent: '#E8F5E9',
                    text: '#333333',
                    light: '#F0FFF0'
                }
            },
            {
                id: 'purple-silver',
                name: 'Purple & Silver',
                colors: {
                    primary: '#6A0DAD',
                    secondary: '#C0C0C0',
                    accent: '#F3E5F5',
                    text: '#333333',
                    light: '#F8F0FF'
                }
            },
            {
                id: 'earth-tone',
                name: 'Earth Tone',
                colors: {
                    primary: '#8B4513',
                    secondary: '#DEB887',
                    accent: '#FAF0E6',
                    text: '#333333',
                    light: '#FFF8F0'
                }
            }
        ];

        const resumeThemes = [
            {
                id: 'blue-gold',
                name: 'Blue & Gold',
                colors: {
                    primary: '#1a3c6e',
                    secondary: '#D4AF37',
                    accent: '#e8f0fe',
                    text: '#333333',
                    light: '#F0F8FF'
                }
            },
            {
                id: 'dark-mode',
                name: 'Dark Professional',
                colors: {
                    primary: '#2C3E50',
                    secondary: '#3498DB',
                    accent: '#34495E',
                    text: '#333333',
                    light: '#F5F7FA'
                }
            },
            {
                id: 'green-white',
                name: 'Green & White',
                colors: {
                    primary: '#2E8B57',
                    secondary: '#333333',
                    accent: '#F0FFF0',
                    text: '#333333',
                    light: '#F8FFF8'
                }
            },
            {
                id: 'purple-gray',
                name: 'Purple & Gray',
                colors: {
                    primary: '#6A0DAD',
                    secondary: '#666666',
                    accent: '#F5F5F5',
                    text: '#333333',
                    light: '#F8F8FF'
                }
            },
            {
                id: 'professional',
                name: 'Classic',
                colors: {
                    primary: '#333333',
                    secondary: '#666666',
                    accent: '#F8F8F8',
                    text: '#333333',
                    light: '#FFFFFF'
                }
            }
        ];

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            console.log("Initializing application...");
            
            // Setup mobile navigation
            setupMobileNavigation();
            
            // Initialize theme options
            initializeThemeOptions();
            
            // Setup event listeners
            setupEventListeners();
            
            // Setup template selection
            setupTemplateSelection();
            
            // Initialize sample data
            initializeSampleData();
            
            console.log("Application initialized successfully");
        });

        function setupMobileNavigation() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuClose = document.getElementById('mobileMenuClose');
            const overlay = document.getElementById('overlay');
            const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
            
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            mobileMenuClose.addEventListener('click', closeMobileMenu);
            overlay.addEventListener('click', closeMobileMenu);
            
            mobileMenuItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = this.getAttribute('data-target');
                    navigateToSection(target);
                    closeMobileMenu();
                });
            });
            
            // Mobile back button
            const mobileBackBtn = document.getElementById('mobileBackBtn');
            mobileBackBtn.addEventListener('click', handleMobileBack);
            
            function closeMobileMenu() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        function handleMobileBack() {
            const activeSections = [
                'biodataFormContainer', 'resumeFormContainer',
                'biodataPreview', 'resumePreview'
            ];
            
            for (let section of activeSections) {
                const element = document.getElementById(section);
                if (element && element.classList.contains('active')) {
                    if (section.includes('Preview')) {
                        // Go back to form from preview
                        if (section.includes('biodata')) {
                            showBiodataForm();
                        } else {
                            showResumeForm();
                        }
                    } else if (section.includes('Form')) {
                        // Go back to selection from form
                        showDocumentSelection();
                    }
                    break;
                }
            }
        }

        function navigateToSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.selection-page, .form-container, .preview-container').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Update mobile back button
                updateMobileBackButton(sectionId);
                
                // Update mobile menu active item
                updateMobileMenuActive(sectionId);
                
                // Scroll to top
                window.scrollTo(0, 0);
            }
        }

        function updateMobileBackButton(sectionId) {
            const mobileBackBtn = document.getElementById('mobileBackBtn');
            
            if (sectionId !== 'documentSelection') {
                mobileBackBtn.classList.add('active');
            } else {
                mobileBackBtn.classList.remove('active');
            }
        }

        function updateMobileMenuActive(sectionId) {
            document.querySelectorAll('.mobile-menu-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const activeItem = document.querySelector(`.mobile-menu-item[data-target="${sectionId}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }
        }

        function initializeThemeOptions() {
            // Biodata themes
            const biodataDesignContainer = document.getElementById('biodataDesignOptions');
            
            biodataThemes.forEach(theme => {
                const themeOption = createThemeOption(theme, 'biodata');
                themeOption.addEventListener('click', () => selectBiodataTheme(theme.id));
                biodataDesignContainer.appendChild(themeOption);
            });

            // Resume themes
            const resumeDesignContainer = document.getElementById('resumeDesignOptions');
            resumeThemes.forEach(theme => {
                const themeOption = createThemeOption(theme, 'resume');
                themeOption.addEventListener('click', () => selectResumeTheme(theme.id));
                resumeDesignContainer.appendChild(themeOption);
            });

            // Set default active themes
            selectBiodataTheme('maroon-gold');
            selectResumeTheme('blue-gold');
        }

        function createThemeOption(theme, type) {
            const themeOption = document.createElement('div');
            themeOption.className = 'design-option';
            themeOption.dataset.theme = theme.id;
            themeOption.innerHTML = `
                <div class="design-preview ${type === 'biodata' ? 'biodata-design-preview' : 'resume-design-preview'}">
                    <div class="theme-preview" style="background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})">
                        <div style="font-size: 10px; text-align: center; padding: 5px;">${theme.name}</div>
                    </div>
                </div>
                <div class="design-name">${theme.name}</div>
            `;
            return themeOption;
        }

        function selectBiodataTheme(themeId) {
            biodataData.theme = themeId;
            
            const container = document.getElementById('biodataDesignOptions');
            if (container) {
                container.querySelectorAll('.design-option').forEach(option => {
                    option.classList.remove('active');
                });
                const activeOption = container.querySelector(`.design-option[data-theme="${themeId}"]`);
                if (activeOption) {
                    activeOption.classList.add('active');
                }
            }
        }

        function selectResumeTheme(themeId) {
            resumeData.theme = themeId;
            
            const container = document.getElementById('resumeDesignOptions');
            if (container) {
                container.querySelectorAll('.design-option').forEach(option => {
                    option.classList.remove('active');
                });
                const activeOption = container.querySelector(`.design-option[data-theme="${themeId}"]`);
                if (activeOption) {
                    activeOption.classList.add('active');
                }
            }
        }

        function setupTemplateSelection() {
            // For biodata
            const biodataTemplateOptions = document.querySelectorAll('#biodataTemplateOptions .template-option');
            biodataTemplateOptions.forEach(option => {
                option.addEventListener('click', function() {
                    biodataTemplateOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    biodataData.template = this.getAttribute('data-template');
                });
            });

            // For resume
            const resumeTemplateOptions = document.querySelectorAll('#resumeTemplateOptions .template-option');
            resumeTemplateOptions.forEach(option => {
                option.addEventListener('click', function() {
                    resumeTemplateOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    resumeData.template = this.getAttribute('data-template');
                });
            });
        }

        function setupEventListeners() {
            // Document selection
            document.getElementById('selectBiodata').addEventListener('click', () => selectDocument('biodata'));
            document.getElementById('selectResume').addEventListener('click', () => selectDocument('resume'));
            
            // Back buttons
            document.getElementById('backFromBiodataForm').addEventListener('click', () => showDocumentSelection());
            document.getElementById('backFromResumeForm').addEventListener('click', () => showDocumentSelection());
            document.getElementById('backFromBiodataPreview').addEventListener('click', () => showBiodataForm());
            document.getElementById('backFromResumePreview').addEventListener('click', () => showResumeForm());
            
            // Print buttons
            document.getElementById('printBiodata').addEventListener('click', () => printDocument('biodata'));
            document.getElementById('printResume').addEventListener('click', () => printDocument('resume'));
            
            // Download PDF buttons
            document.getElementById('downloadBiodataPDF').addEventListener('click', () => downloadPDF('biodata'));
            document.getElementById('downloadResumePDF').addEventListener('click', () => downloadPDF('resume'));
            
            // Generate buttons
            document.getElementById('generateBiodata').addEventListener('click', generateBiodata);
            document.getElementById('generateResume').addEventListener('click', generateResume);
            
            // Biodata form events
            setupBiodataFormEvents();
            
            // Resume form events
            setupResumeFormEvents();
            
            // Setup DOB age calculation
            const dobInput = document.getElementById('biodataDob');
            if (dobInput) {
                dobInput.addEventListener('change', calculateAge);
            }
            
            // Add enter key support for adding items
            document.getElementById('biodataHobbyInput')?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addHobbyItem();
                }
            });
            
            document.getElementById('biodataLanguageInput')?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addLanguageItem();
                }
            });
            
            document.getElementById('resumeSkillInput')?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkillItem();
                }
            });
            
            document.getElementById('resumeLanguageInput')?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addResumeLanguageItem();
                }
            });
        }

        function setupBiodataFormEvents() {
            // Photo upload
            const biodataPhotoUpload = document.getElementById('biodataPhotoUpload');
            const biodataPhotoPreview = document.getElementById('biodataPhotoPreview');
            const biodataPhotoPlaceholder = document.getElementById('biodataPhotoPlaceholder');
            const removeBiodataPhoto = document.getElementById('removeBiodataPhoto');
            
            if (biodataPhotoUpload) {
                biodataPhotoUpload.addEventListener('change', function(e) {
                    handlePhotoUpload(e, biodataPhotoPreview, biodataPhotoPlaceholder, removeBiodataPhoto, 'biodata');
                });
            }
            
            if (removeBiodataPhoto) {
                removeBiodataPhoto.addEventListener('click', function() {
                    removePhoto(biodataPhotoPreview, biodataPhotoPlaceholder, removeBiodataPhoto, biodataPhotoUpload, 'biodata');
                });
            }
            
            // Siblings
            const addSiblingBtn = document.getElementById('addSiblingBtn');
            if (addSiblingBtn) {
                addSiblingBtn.addEventListener('click', addSiblingInput);
            }
            
            // Education
            const addEducationBtn = document.getElementById('addEducationBtn');
            if (addEducationBtn) {
                addEducationBtn.addEventListener('click', addEducationItem);
            }
            
            // Hobbies
            const addBiodataHobby = document.getElementById('addBiodataHobby');
            if (addBiodataHobby) {
                addBiodataHobby.addEventListener('click', addHobbyItem);
            }
            
            // Languages
            const addBiodataLanguage = document.getElementById('addBiodataLanguage');
            if (addBiodataLanguage) {
                addBiodataLanguage.addEventListener('click', addLanguageItem);
            }
        }

        function setupResumeFormEvents() {
            // Resume photo upload
            const resumePhotoUpload = document.getElementById('resumePhotoUpload');
            const resumePhotoPreview = document.getElementById('resumePhotoPreview');
            const resumePhotoPlaceholder = document.getElementById('resumePhotoPlaceholder');
            const removeResumePhoto = document.getElementById('removeResumePhoto');
            
            if (resumePhotoUpload) {
                resumePhotoUpload.addEventListener('change', function(e) {
                    handlePhotoUpload(e, resumePhotoPreview, resumePhotoPlaceholder, removeResumePhoto, 'resume');
                });
            }
            
            if (removeResumePhoto) {
                removeResumePhoto.addEventListener('click', function() {
                    removePhoto(resumePhotoPreview, resumePhotoPlaceholder, removeResumePhoto, resumePhotoUpload, 'resume');
                });
            }
            
            // Experience
            const addExperienceBtn = document.getElementById('addExperienceBtn');
            if (addExperienceBtn) {
                addExperienceBtn.addEventListener('click', addExperienceItem);
            }
            
            // Education
            const addResumeEducationBtn = document.getElementById('addResumeEducationBtn');
            if (addResumeEducationBtn) {
                addResumeEducationBtn.addEventListener('click', addResumeEducationItem);
            }
            
            // Skills
            const addResumeSkill = document.getElementById('addResumeSkill');
            if (addResumeSkill) {
                addResumeSkill.addEventListener('click', addSkillItem);
            }
            
            // Languages
            const addResumeLanguage = document.getElementById('addResumeLanguage');
            if (addResumeLanguage) {
                addResumeLanguage.addEventListener('click', addResumeLanguageItem);
            }
        }

        function handlePhotoUpload(e, preview, placeholder, removeBtn, type) {
            const file = e.target.files[0];
            if (!file) return;
            
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                showError('File size too large. Please select an image smaller than 2MB.');
                return;
            }
            
            // Check file type
            if (!file.type.match('image.*')) {
                showError('Please select an image file (JPEG, PNG, etc.)');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Store the data URL
                if (type === 'biodata') {
                    biodataData.photo = e.target.result;
                } else {
                    resumeData.photo = e.target.result;
                }
                
                // Update preview
                preview.src = e.target.result;
                preview.style.display = 'block';
                placeholder.style.display = 'none';
                
                // Show remove button
                removeBtn.style.display = 'inline-flex';
                
                showSuccess('Photo uploaded successfully!');
            };
            
            reader.onerror = function() {
                showError('Error reading file. Please try again.');
            };
            
            reader.readAsDataURL(file);
        }

        function removePhoto(preview, placeholder, removeBtn, fileInput, type) {
            // Clear photo data
            if (type === 'biodata') {
                biodataData.photo = null;
            } else {
                resumeData.photo = null;
            }
            
            // Reset preview
            preview.src = '';
            preview.style.display = 'none';
            placeholder.style.display = 'flex';
            
            // Hide remove button
            removeBtn.style.display = 'none';
            
            // Reset file input
            fileInput.value = '';
            
            showSuccess('Photo removed successfully!');
        }

        function showError(message) {
            const successMsg = document.getElementById('successMessage');
            successMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            successMsg.style.background = '#ff4444';
            successMsg.classList.add('active');
            
            setTimeout(() => {
                successMsg.classList.remove('active');
                successMsg.style.background = '';
            }, 5000);
        }

        function showSuccess(message) {
            const successMsg = document.getElementById('successMessage');
            successMsg.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
            successMsg.style.background = '';
            successMsg.classList.add('active');
            
            setTimeout(() => {
                successMsg.classList.remove('active');
            }, 3000);
        }

        function addSiblingInput() {
            const container = document.getElementById('siblingsContainer');
            
            // Remove placeholder if it exists
            const placeholder = container.querySelector('p');
            if (placeholder) {
                placeholder.remove();
            }
            
            const siblingId = Date.now();
            const siblingDiv = document.createElement('div');
            siblingDiv.className = 'sibling-input-container';
            siblingDiv.id = `sibling-${siblingId}`;
            siblingDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--maroon); font-size: 1rem;">Sibling Details</div>
                    <button type="button" class="btn-remove-item" onclick="removeSibling('${siblingId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="sibling-input-grid">
                    <div class="form-group">
                        <label style="font-size: 0.9rem;">Name</label>
                        <input type="text" class="sibling-name" placeholder="Sibling name" style="padding: 10px 12px; font-size: 0.9rem;">
                    </div>
                    <div class="form-group">
                        <label style="font-size: 0.9rem;">Relationship</label>
                        <select class="sibling-relation" style="padding: 10px 12px; font-size: 0.9rem;">
                            <option value="">Select</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label style="font-size: 0.9rem;">Age</label>
                        <input type="number" class="sibling-age" placeholder="Age" min="1" max="100" style="padding: 10px 12px; font-size: 0.9rem;">
                    </div>
                    <div class="form-group">
                        <label style="font-size: 0.9rem;">Occupation</label>
                        <input type="text" class="sibling-occupation" placeholder="Occupation" style="padding: 10px 12px; font-size: 0.9rem;">
                    </div>
                    <div class="form-group">
                        <label style="font-size: 0.9rem;">Marital Status</label>
                        <select class="sibling-marital" style="padding: 10px 12px; font-size: 0.9rem;">
                            <option value="">Select</option>
                            <option value="Married">Married</option>
                            <option value="Unmarried">Unmarried</option>
                        </select>
                    </div>
                </div>
            `;
            
            container.appendChild(siblingDiv);
            
            // Scroll to the new sibling input
            siblingDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            showSuccess('Sibling field added!');
        }

        window.removeSibling = function(id) {
            const element = document.getElementById(`sibling-${id}`);
            if (element) {
                element.remove();
                
                // Check if container is empty, add placeholder
                const container = document.getElementById('siblingsContainer');
                if (container.children.length === 0) {
                    const placeholder = document.createElement('p');
                    placeholder.style.cssText = 'color: var(--text-light); text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;';
                    placeholder.textContent = 'No siblings added yet. Click "Add Sibling" below to add sibling details.';
                    container.appendChild(placeholder);
                }
                
                showSuccess('Sibling removed!');
            }
        };

        function addEducationItem() {
            const degree = document.getElementById('biodataDegree').value.trim();
            const college = document.getElementById('biodataCollege').value.trim();
            const year = document.getElementById('biodataYear').value.trim();
            const result = document.getElementById('biodataResult').value.trim();
            
            if (!degree && !college) {
                showError('Please enter at least Degree/Qualification or College/School');
                return;
            }
            
            // Format education entry
            let educationEntry = '';
            if (degree) educationEntry += degree;
            if (college) educationEntry += (educationEntry ? ' | ' : '') + college;
            if (year) educationEntry += (educationEntry ? ' | ' : '') + year;
            if (result) educationEntry += (educationEntry ? ' | ' : '') + result;
            
            // Add to data
            biodataData.education.push(educationEntry);
            
            // Render item
            renderEducationItem(educationEntry);
            
            // Clear inputs
            document.getElementById('biodataDegree').value = '';
            document.getElementById('biodataCollege').value = '';
            document.getElementById('biodataYear').value = '';
            document.getElementById('biodataResult').value = '';
            
            // Focus on first input
            document.getElementById('biodataDegree').focus();
            
            showSuccess('Education added!');
        }

        function renderEducationItem(education) {
            const container = document.getElementById('educationContainer');
            
            // Remove placeholder if it exists
            const placeholder = container.querySelector('p');
            if (placeholder) {
                placeholder.remove();
            }
            
            const index = biodataData.education.length - 1;
            const div = document.createElement('div');
            div.className = 'item-card';
            div.innerHTML = `
                <div class="item-header">
                    <div class="item-title">Education</div>
                    <button type="button" class="btn-remove-item" onclick="removeEducationItem(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div style="font-size: 0.9rem;">${education}</div>
            `;
            container.appendChild(div);
        }

        window.removeEducationItem = function(index) {
            biodataData.education.splice(index, 1);
            
            const container = document.getElementById('educationContainer');
            if (container) {
                container.innerHTML = '';
                
                if (biodataData.education.length === 0) {
                    const placeholder = document.createElement('p');
                    placeholder.style.cssText = 'color: var(--text-light); text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;';
                    placeholder.textContent = 'No education added yet. Add your qualifications above.';
                    container.appendChild(placeholder);
                } else {
                    biodataData.education.forEach((edu, idx) => {
                        const div = document.createElement('div');
                        div.className = 'item-card';
                        div.innerHTML = `
                            <div class="item-header">
                                <div class="item-title">Education</div>
                                <button type="button" class="btn-remove-item" onclick="removeEducationItem(${idx})">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div style="font-size: 0.9rem;">${edu}</div>
                        `;
                        container.appendChild(div);
                    });
                }
            }
            
            showSuccess('Education removed!');
        };

        function addHobbyItem() {
            const input = document.getElementById('biodataHobbyInput');
            const hobby = input.value.trim();
            
            if (hobby) {
                if (biodataData.hobbies.includes(hobby)) {
                    showError('This hobby is already added');
                    return;
                }
                
                biodataData.hobbies.push(hobby);
                renderHobbyItem(hobby);
                input.value = '';
                input.focus();
                
                showSuccess('Hobby added!');
            } else {
                showError('Please enter a hobby');
            }
        }

        function renderHobbyItem(hobby) {
            const container = document.getElementById('biodataHobbiesList');
            const index = biodataData.hobbies.length - 1;
            
            const div = document.createElement('div');
            div.className = 'tag';
            div.innerHTML = `
                ${hobby}
                <button type="button" class="remove-tag" onclick="removeHobbyItem(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(div);
        }

        window.removeHobbyItem = function(index) {
            biodataData.hobbies.splice(index, 1);
            
            const container = document.getElementById('biodataHobbiesList');
            if (container) {
                container.innerHTML = '';
                biodataData.hobbies.forEach((hobby, idx) => {
                    renderHobbyItem(hobby);
                });
            }
            
            showSuccess('Hobby removed!');
        };

        function addLanguageItem() {
            const input = document.getElementById('biodataLanguageInput');
            const language = input.value.trim();
            
            if (language) {
                if (biodataData.languages.includes(language)) {
                    showError('This language is already added');
                    return;
                }
                
                biodataData.languages.push(language);
                renderLanguageItem(language);
                input.value = '';
                input.focus();
                
                showSuccess('Language added!');
            } else {
                showError('Please enter a language');
            }
        }

        function renderLanguageItem(language) {
            const container = document.getElementById('biodataLanguagesList');
            const index = biodataData.languages.length - 1;
            
            const div = document.createElement('div');
            div.className = 'tag';
            div.innerHTML = `
                ${language}
                <button type="button" class="remove-tag" onclick="removeLanguageItem(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(div);
        }

        window.removeLanguageItem = function(index) {
            biodataData.languages.splice(index, 1);
            
            const container = document.getElementById('biodataLanguagesList');
            if (container) {
                container.innerHTML = '';
                biodataData.languages.forEach((lang, idx) => {
                    renderLanguageItem(lang);
                });
            }
            
            showSuccess('Language removed!');
        };

        // Resume Functions
        function addExperienceItem() {
            const container = document.getElementById('experienceContainer');
            const experienceId = Date.now();
            
            const experienceDiv = document.createElement('div');
            experienceDiv.className = 'experience-item';
            experienceDiv.innerHTML = `
                <div class="item-card">
                    <div class="item-header">
                        <div class="item-title">
                            <input type="text" placeholder="Job Title" class="experience-title" style="border: none; background: transparent; font-size: 1.1rem; font-weight: 600; color: var(--professional-blue); width: 100%;">
                        </div>
                        <button type="button" class="btn-remove-item" onclick="this.closest('.experience-item').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <input type="text" placeholder="Company Name" class="experience-company" style="border: none; background: transparent; font-weight: 500; color: var(--professional-blue); width: 100%;">
                    </div>
                    <div style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 8px; display: flex; gap: 15px;">
                        <input type="text" placeholder="Start Date (e.g., Jan 2020)" class="experience-start" style="border: none; background: transparent; width: 45%;">
                        <input type="text" placeholder="End Date (e.g., Present)" class="experience-end" style="border: none; background: transparent; width: 45%;">
                    </div>
                    <div style="font-size: 0.9rem;">
                        <textarea placeholder="• Describe your responsibilities and achievements\n• Use bullet points\n• Focus on results and accomplishments" class="experience-description" rows="3" style="width: 100%; border: 1px solid #ddd; border-radius: 4px; padding: 8px; font-size: 0.9rem; resize: vertical;"></textarea>
                    </div>
                </div>
            `;
            
            container.appendChild(experienceDiv);
            
            // Scroll to new experience
            experienceDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            showSuccess('Work experience field added!');
        }

        function addResumeEducationItem() {
            const container = document.getElementById('resumeEducationContainer');
            const educationId = Date.now();
            
            const educationDiv = document.createElement('div');
            educationDiv.className = 'education-item';
            educationDiv.innerHTML = `
                <div class="item-card">
                    <div class="item-header">
                        <div class="item-title">
                            <input type="text" placeholder="Degree/Qualification" class="education-degree" style="border: none; background: transparent; font-size: 1.1rem; font-weight: 600; color: var(--professional-blue); width: 100%;">
                        </div>
                        <button type="button" class="btn-remove-item" onclick="this.closest('.education-item').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <input type="text" placeholder="Institution Name" class="education-institution" style="border: none; background: transparent; font-weight: 500; color: var(--professional-blue); width: 100%;">
                    </div>
                    <div style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 8px;">
                        <input type="text" placeholder="Duration (e.g., 2018-2022)" class="education-duration" style="border: none; background: transparent; width: 60%;">
                        <input type="text" placeholder="GPA/Score (Optional)" class="education-gpa" style="border: none; background: transparent; width: 35%; float: right;">
                    </div>
                </div>
            `;
            
            container.appendChild(educationDiv);
            
            // Scroll to new education
            educationDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            showSuccess('Education field added!');
        }

        function addSkillItem() {
            const input = document.getElementById('resumeSkillInput');
            const skill = input.value.trim();
            
            if (skill) {
                if (resumeData.skills.includes(skill)) {
                    showError('This skill is already added');
                    return;
                }
                
                resumeData.skills.push(skill);
                renderSkillItem(skill);
                input.value = '';
                input.focus();
                
                showSuccess('Skill added!');
            } else {
                showError('Please enter a skill');
            }
        }

        function renderSkillItem(skill) {
            const container = document.getElementById('resumeSkillsList');
            const index = resumeData.skills.length - 1;
            
            const div = document.createElement('div');
            div.className = 'tag';
            div.innerHTML = `
                ${skill}
                <button type="button" class="remove-tag" onclick="removeResumeSkillItem(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(div);
        }

        window.removeResumeSkillItem = function(index) {
            resumeData.skills.splice(index, 1);
            
            const container = document.getElementById('resumeSkillsList');
            if (container) {
                container.innerHTML = '';
                resumeData.skills.forEach((skill, idx) => {
                    renderSkillItem(skill);
                });
            }
            
            showSuccess('Skill removed!');
        };

        function addResumeLanguageItem() {
            const input = document.getElementById('resumeLanguageInput');
            const language = input.value.trim();
            
            if (language) {
                if (resumeData.languages.includes(language)) {
                    showError('This language is already added');
                    return;
                }
                
                resumeData.languages.push(language);
                renderResumeLanguageItem(language);
                input.value = '';
                input.focus();
                
                showSuccess('Language added!');
            } else {
                showError('Please enter a language');
            }
        }

        function renderResumeLanguageItem(language) {
            const container = document.getElementById('resumeLanguagesList');
            const index = resumeData.languages.length - 1;
            
            const div = document.createElement('div');
            div.className = 'tag';
            div.innerHTML = `
                ${language}
                <button type="button" class="remove-tag" onclick="removeResumeLanguageItem(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(div);
        }

        window.removeResumeLanguageItem = function(index) {
            resumeData.languages.splice(index, 1);
            
            const container = document.getElementById('resumeLanguagesList');
            if (container) {
                container.innerHTML = '';
                resumeData.languages.forEach((lang, idx) => {
                    renderResumeLanguageItem(lang);
                });
            }
            
            showSuccess('Language removed!');
        };

        function selectDocument(type) {
            const sectionId = type === 'biodata' ? 'biodataFormContainer' : 'resumeFormContainer';
            navigateToSection(sectionId);
            
            // Update card active states
            document.getElementById('biodataCard').classList.toggle('active', type === 'biodata');
            document.getElementById('resumeCard').classList.toggle('active', type === 'resume');
        }

        function showDocumentSelection() {
            navigateToSection('documentSelection');
            document.getElementById('biodataCard').classList.remove('active');
            document.getElementById('resumeCard').classList.remove('active');
        }

        function showBiodataForm() {
            navigateToSection('biodataFormContainer');
        }

        function showResumeForm() {
            navigateToSection('resumeFormContainer');
        }

        function calculateAge() {
            const dob = new Date(this.value);
            if (!isNaN(dob.getTime())) {
                const today = new Date();
                let age = today.getFullYear() - dob.getFullYear();
                const monthDiff = today.getMonth() - dob.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                    age--;
                }
                
                // Update age field
                document.getElementById('biodataAge').value = age;
            }
        }

        function generateBiodata() {
            console.log("Generating biodata...");
            
            // Collect data from form
            collectBiodataData();
            
            // Validate required fields
            if (!validateBiodataForm()) {
                return;
            }
            
            // Generate HTML preview
            generateBiodataHTML();
            
            // Show success message
            showSuccessMessage('Biodata generated successfully! Scroll down to preview.');
            
            // Show preview
            navigateToSection('biodataPreview');
        }

        function collectBiodataData() {
            // Personal data
            biodataData.personal = {
                fullName: document.getElementById('biodataFullName').value,
                dob: document.getElementById('biodataDob').value,
                age: document.getElementById('biodataAge').value,
                gender: document.getElementById('biodataGender').value,
                heightFeet: document.getElementById('biodataHeightFeet').value,
                heightInches: document.getElementById('biodataHeightInches').value,
                religion: document.getElementById('biodataReligion').value,
                caste: document.getElementById('biodataCaste').value,
                maritalStatus: document.getElementById('biodataMaritalStatus').value,
                nationality: document.getElementById('biodataNationality').value,
                motherTongue: document.getElementById('biodataMotherTongue').value,
                diet: document.getElementById('biodataDiet').value,
                habits: document.getElementById('biodataHabits').value
            };
            
            // Family data
            biodataData.family = {
                fatherName: document.getElementById('biodataFatherName').value,
                fatherOccupation: document.getElementById('biodataFatherOccupation').value,
                motherName: document.getElementById('biodataMotherName').value,
                motherOccupation: document.getElementById('biodataMotherOccupation').value,
                siblings: []
            };
            
            // Collect siblings data
            const siblingContainers = document.querySelectorAll('.sibling-input-container');
            siblingContainers.forEach(container => {
                const name = container.querySelector('.sibling-name')?.value;
                const relation = container.querySelector('.sibling-relation')?.value;
                const age = container.querySelector('.sibling-age')?.value;
                const occupation = container.querySelector('.sibling-occupation')?.value;
                const marital = container.querySelector('.sibling-marital')?.value;
                
                if (name) {
                    biodataData.family.siblings.push({
                        name,
                        relation,
                        age,
                        occupation,
                        marital
                    });
                }
            });
            
            // Annual Income
            biodataData.annualIncome = document.getElementById('biodataAnnualIncome').value;
            
            // Contact data
            biodataData.contact = {
                phone: document.getElementById('biodataPhone').value,
                email: document.getElementById('biodataEmail').value,
                address: document.getElementById('biodataAddress').value
            };
            
            // Expectations
            biodataData.expectations = document.getElementById('biodataExpectations').value;
        }

        function validateBiodataForm() {
            let isValid = true;
            const requiredFields = [
                { id: 'biodataFullName', name: 'Full Name' },
                { id: 'biodataDob', name: 'Date of Birth' },
                { id: 'biodataGender', name: 'Gender' },
                { id: 'biodataReligion', name: 'Religion' },
                { id: 'biodataMaritalStatus', name: 'Marital Status' },
                { id: 'biodataNationality', name: 'Nationality' },
                { id: 'biodataMotherTongue', name: 'Mother Tongue' },
                { id: 'biodataFatherName', name: 'Father\'s Name' },
                { id: 'biodataFatherOccupation', name: 'Father\'s Occupation' },
                { id: 'biodataMotherName', name: 'Mother\'s Name' },
                { id: 'biodataPhone', name: 'Phone Number' },
                { id: 'biodataEmail', name: 'Email Address' },
                { id: 'biodataAddress', name: 'Address' },
                { id: 'biodataExpectations', name: 'Partner Expectations' }
            ];
            
            // Reset all field borders
            requiredFields.forEach(field => {
                const element = document.getElementById(field.id);
                if (element) {
                    element.style.borderColor = '#ddd';
                }
            });
            
            const errors = [];
            
            for (let field of requiredFields) {
                const element = document.getElementById(field.id);
                if (element && !element.value.trim()) {
                    isValid = false;
                    errors.push(field.name);
                    element.style.borderColor = '#ff4444';
                    
                    // Scroll to first error
                    if (errors.length === 1) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        element.focus();
                    }
                }
            }
            
            // Email validation
            const emailField = document.getElementById('biodataEmail');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    errors.push('Invalid Email Address');
                    emailField.style.borderColor = '#ff4444';
                }
            }
            
            if (!isValid) {
                showError(`Please fill all required fields: ${errors.join(', ')}`);
            }
            
            return isValid;
        }

        function showSuccessMessage(message) {
            const successMsg = document.getElementById('successMessage');
            successMsg.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
            successMsg.style.background = '';
            successMsg.classList.add('active');
            
            setTimeout(() => {
                successMsg.classList.remove('active');
            }, 5000);
        }

        function generateBiodataHTML() {
            const container = document.getElementById('a4Biodata');
            const theme = biodataThemes.find(t => t.id === biodataData.theme) || biodataThemes[0];
            const template = biodataData.template || 'template-1';
            
            // Call appropriate template function
            if (template === 'template-1') {
                container.innerHTML = generateBiodataTemplate1(theme);
            } else if (template === 'template-2') {
                container.innerHTML = generateBiodataTemplate2(theme);
            } else if (template === 'template-3') {
                container.innerHTML = generateBiodataTemplate3(theme);
            } else if (template === 'template-4') {
                container.innerHTML = generateBiodataTemplate4(theme);
            } else if (template === 'template-5') {
                container.innerHTML = generateBiodataTemplate5(theme);
            }
        }

        function generateBiodataTemplate1(theme) {
            // Calculate height text
            let heightText = '';
            if (biodataData.personal.heightFeet && biodataData.personal.heightInches) {
                const totalInches = parseInt(biodataData.personal.heightFeet) * 12 + parseInt(biodataData.personal.heightInches);
                const cm = Math.round(totalInches * 2.54);
                heightText = `${biodataData.personal.heightFeet}'${biodataData.personal.heightInches}" (${cm} cm)`;
            }
            
            // Format date
            const formatDate = (dateString) => {
                if (!dateString) return 'Not specified';
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            };
            
            // Use uploaded photo or default
            const photoSrc = biodataData.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
            
            // Generate siblings HTML
            let siblingsHTML = '';
            if (biodataData.family.siblings.length > 0) {
                biodataData.family.siblings.forEach(sibling => {
                    siblingsHTML += `
                        <tr>
                            <td style="padding: 3px 0; font-size: 11px;">${sibling.relation || 'Sibling'}</td>
                            <td style="padding: 3px 0; font-size: 11px;">${sibling.name}</td>
                            <td style="padding: 3px 0; font-size: 11px;">${sibling.age || ''}</td>
                            <td style="padding: 3px 0; font-size: 11px;">${sibling.occupation || ''}</td>
                            <td style="padding: 3px 0; font-size: 11px;">${sibling.marital || ''}</td>
                        </tr>
                    `;
                });
            }
            
            // Generate education HTML with proper formatting
            let educationHTML = '';
            if (biodataData.education.length > 0) {
                educationHTML = biodataData.education.map(edu => {
                    // Split the education string into parts
                    const parts = edu.split(' | ');
                    let formattedEdu = '';
                    if (parts.length === 1) {
                        formattedEdu = parts[0];
                    } else if (parts.length === 2) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span> | ${parts[1]}`;
                    } else if (parts.length === 3) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span> | ${parts[1]} | ${parts[2]}`;
                    } else if (parts.length >= 4) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span> | ${parts[1]} | ${parts[2]} | ${parts[3]}`;
                    }
                    return `<div style="margin-bottom: 4px; padding: 3px 0; font-size: 11px;">• ${formattedEdu}</div>`;
                }).join('');
            } else {
                educationHTML = '<div style="color: #666; font-size: 10.5px;">No education information provided</div>';
            }
            
            return `
                <div class="template-1 template-content">
                    <!-- Header -->
                    <div class="header-section">
                        <h1 style="font-family: 'Playfair Display', serif; margin: 0 0 8px 0; font-size: 28px; font-weight: 700;">${biodataData.personal.fullName}</h1>
                        <div style="font-size: 14px; opacity: 0.9;">Wedding Biodata</div>
                    </div>
                    
                    <!-- Main Content -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 25px;">
                        <!-- Left Column -->
                        <div>
                            <!-- Photo -->
                            <div style="width: 140px; height: 180px; margin: 0 auto 25px;" class="photo-frame">
                                <img src="${photoSrc}" alt="Profile Photo" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            
                            <!-- Personal Information -->
                            <div style="margin-bottom: 25px;">
                                <h3 class="section-title">Personal Information</h3>
                                <table style="width: 100%; font-size: 11.5px;">
                                    <tr><td style="width: 130px; font-weight: 600; padding: 4px 0;">Full Name:</td><td>${biodataData.personal.fullName}</td></tr>
                                    <tr><td style="font-weight: 600; padding: 4px 0;">Date of Birth:</td><td>${formatDate(biodataData.personal.dob)}</td></tr>
                                    <tr><td style="font-weight: 600; padding: 4px 0;">Age:</td><td>${biodataData.personal.age || ''} Years</td></tr>
                                    ${heightText ? `<tr><td style="font-weight: 600; padding: 4px 0;">Height:</td><td>${heightText}</td></tr>` : ''}
                                    <tr><td style="font-weight: 600; padding: 4px 0;">Religion / Caste:</td><td>${biodataData.personal.religion}${biodataData.personal.caste ? ' / ' + biodataData.personal.caste : ''}</td></tr>
                                    <tr><td style="font-weight: 600; padding: 4px 0;">Marital Status:</td><td>${biodataData.personal.maritalStatus}</td></tr>
                                    <tr><td style="font-weight: 600; padding: 4px 0;">Nationality:</td><td>${biodataData.personal.nationality}</td></tr>
                                    <tr><td style="font-weight: 600; padding: 4px 0;">Mother Tongue:</td><td>${biodataData.personal.motherTongue}</td></tr>
                                </table>
                            </div>
                            
                            <!-- Hobbies & Languages -->
                            <div>
                                <h3 class="section-title">Hobbies & Languages</h3>
                                <div style="margin-bottom: 15px;">
                                    <div style="font-weight: 600; margin-bottom: 8px; font-size: 12px;">Hobbies:</div>
                                    <div>${biodataData.hobbies.map(hobby => `<span style="background: #e8f0fe; padding: 4px 12px; border-radius: 12px; margin: 3px; display: inline-block; font-size: 10px;">${hobby}</span>`).join('') || '<span style="color: #666; font-size: 10.5px;">Not specified</span>'}</div>
                                </div>
                                <div>
                                    <div style="font-weight: 600; margin-bottom: 8px; font-size: 12px;">Languages Known:</div>
                                    <div style="font-size: 11.5px;">${biodataData.languages.join(', ') || biodataData.personal.motherTongue}</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right Column -->
                        <div>
                            <!-- Family Information -->
                            <div style="margin-bottom: 25px;">
                                <h3 class="section-title">Family Information</h3>
                                <table style="width: 100%; font-size: 11.5px;">
                                    <tr><td style="width: 130px; font-weight: 600; padding: 4px 0;">Father's Name:</td><td>${biodataData.family.fatherName}</td></tr>
                                    <tr><td style="font-weight: 600; padding: 4px 0;">Occupation:</td><td>${biodataData.family.fatherOccupation}</td></tr>
                                    <tr><td style="font-weight: 600; padding: 4px 0;">Mother's Name:</td><td>${biodataData.family.motherName}</td></tr>
                                    ${biodataData.family.motherOccupation ? `<tr><td style="font-weight: 600; padding: 4px 0;">Occupation:</td><td>${biodataData.family.motherOccupation}</td></tr>` : ''}
                                </table>
                                
                                ${siblingsHTML ? `
                                <div style="margin-top: 15px;">
                                    <div style="font-weight: 600; margin-bottom: 8px; font-size: 12px;">Siblings:</div>
                                    <table style="width: 100%; font-size: 10.5px; border-collapse: collapse;">
                                        <tr style="background: #f0f0f0;">
                                            <th style="padding: 6px; text-align: left;">Relation</th>
                                            <th style="padding: 6px; text-align: left;">Name</th>
                                            <th style="padding: 6px; text-align: left;">Age</th>
                                            <th style="padding: 6px; text-align: left;">Occupation</th>
                                            <th style="padding: 6px; text-align: left;">Status</th>
                                        </tr>
                                        ${siblingsHTML}
                                    </table>
                                </div>
                                ` : ''}
                            </div>
                            
                            <!-- Education & Income -->
                            <div style="margin-bottom: 25px;">
                                <h3 class="section-title">Education & Income</h3>
                                ${educationHTML}
                                ${biodataData.annualIncome ? `
                                <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #3498db;">
                                    <div style="font-weight: 600; font-size: 12px;">Annual Income:</div>
                                    <div style="font-size: 13px; color: #2c3e50;">${biodataData.annualIncome}</div>
                                </div>
                                ` : ''}
                            </div>
                            
                            <!-- Contact Details -->
                            <div style="margin-bottom: 25px;">
                                <h3 class="section-title">Contact Details</h3>
                                <table style="width: 100%; font-size: 11.5px;">
                                    <tr><td style="width: 130px; font-weight: 600; padding: 4px 0;">Phone:</td><td>${biodataData.contact.phone}</td></tr>
                                    <tr><td style="font-weight: 600; padding: 4px 0;">Email:</td><td>${biodataData.contact.email}</td></tr>
                                    <tr><td style="font-weight: 600; padding: 4px 0;">Address:</td><td>${biodataData.contact.address}</td></tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Partner Expectations -->
                    <div style="margin-top: 20px;">
                        <h3 class="section-title">Partner Expectations</h3>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; line-height: 1.6; font-size: 11.5px; color: #444;">
                            ${biodataData.expectations}
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="footer">
                        Generated on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
                    </div>
                </div>
            `;
        }

        function generateBiodataTemplate2(theme) {
            // Calculate height text
            let heightText = '';
            if (biodataData.personal.heightFeet && biodataData.personal.heightInches) {
                heightText = `${biodataData.personal.heightFeet}'${biodataData.personal.heightInches}"`;
            }
            
            // Format date
            const formatDate = (dateString) => {
                if (!dateString) return 'Not specified';
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
            };
            
            const photoSrc = biodataData.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
            
            // Generate education HTML with proper formatting
            let educationHTML = '';
            if (biodataData.education.length > 0) {
                educationHTML = biodataData.education.map(edu => {
                    const parts = edu.split(' | ');
                    let formattedEdu = '';
                    if (parts.length === 1) {
                        formattedEdu = parts[0];
                    } else if (parts.length === 2) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span><br><span style="color: #666; font-size: 10.5px;">${parts[1]}</span>`;
                    } else if (parts.length === 3) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span><br><span style="color: #666; font-size: 10.5px;">${parts[1]} | ${parts[2]}</span>`;
                    } else if (parts.length >= 4) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span><br><span style="color: #666; font-size: 10.5px;">${parts[1]} | ${parts[2]} | ${parts[3]}</span>`;
                    }
                    return `<div class="info-item" style="margin-bottom: 12px;">
                        <div style="font-size: 11px;">${formattedEdu}</div>
                    </div>`;
                }).join('');
            }
            
            return `
                <div class="template-2 template-content">
                    <!-- Header -->
                    <div style="display: grid; grid-template-columns: 140px 1fr; gap: 30px; padding-bottom: 20px; border-bottom: 3px solid #1a3c6e; margin-bottom: 25px;">
                        <div style="width: 140px; height: 160px; border-radius: 8px; overflow: hidden; border: 3px solid #1a3c6e;">
                            <img src="${photoSrc}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div>
                            <h1 style="margin: 0 0 5px 0; font-size: 24px; font-weight: 700; color: #1a3c6e;">${biodataData.personal.fullName}</h1>
                            <div style="font-size: 14px; color: #666; margin-bottom: 15px;">Wedding Biodata</div>
                            <div style="font-size: 11px; color: #666; line-height: 1.6;">
                                <div><i class="fas fa-envelope"></i> ${biodataData.contact.email}</div>
                                <div><i class="fas fa-phone"></i> ${biodataData.contact.phone}</div>
                                <div><i class="fas fa-map-marker-alt"></i> ${biodataData.contact.address}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Two column layout -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                        <div>
                            <!-- Personal -->
                            <div class="section-title">PERSONAL DETAILS</div>
                            <div class="info-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Date of Birth</div>
                                <div style="font-size: 11px;">${formatDate(biodataData.personal.dob)}</div>
                            </div>
                            <div class="info-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Age</div>
                                <div style="font-size: 11px;">${biodataData.personal.age || ''} Years</div>
                            </div>
                            ${heightText ? `
                            <div class="info-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Height</div>
                                <div style="font-size: 11px;">${heightText}</div>
                            </div>
                            ` : ''}
                            <div class="info-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Religion</div>
                                <div style="font-size: 11px;">${biodataData.personal.religion}</div>
                            </div>
                            <div class="info-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Marital Status</div>
                                <div style="font-size: 11px;">${biodataData.personal.maritalStatus}</div>
                            </div>
                            
                            <!-- Family -->
                            <div class="section-title" style="margin-top: 25px;">FAMILY DETAILS</div>
                            <div class="info-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Father</div>
                                <div style="font-size: 11px;">${biodataData.family.fatherName}</div>
                                <div style="font-size: 10.5px; color: #666;">${biodataData.family.fatherOccupation}</div>
                            </div>
                            <div class="info-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Mother</div>
                                <div style="font-size: 11px;">${biodataData.family.motherName}</div>
                                ${biodataData.family.motherOccupation ? `<div style="font-size: 10.5px; color: #666;">${biodataData.family.motherOccupation}</div>` : ''}
                            </div>
                        </div>
                        
                        <div>
                            <!-- Education -->
                            <div class="section-title">EDUCATION</div>
                            ${educationHTML || '<div style="color: #666; font-size: 10.5px;">No education information provided</div>'}
                            
                            ${biodataData.annualIncome ? `
                            <div class="info-item" style="background: #e8f0fe; padding: 12px; border-radius: 6px; margin-top: 15px;">
                                <div style="font-weight: 600; font-size: 11.5px;">Annual Income</div>
                                <div style="font-size: 12px; color: #1a3c6e;">${biodataData.annualIncome}</div>
                            </div>
                            ` : ''}
                            
                            <!-- Expectations -->
                            <div class="section-title" style="margin-top: 25px;">PARTNER EXPECTATIONS</div>
                            <div style="font-size: 11.5px; line-height: 1.6; color: #444;">
                                ${biodataData.expectations}
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer">
                        Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                    </div>
                </div>
            `;
        }

        function generateBiodataTemplate3(theme) {
            // Calculate height text
            let heightText = '';
            if (biodataData.personal.heightFeet && biodataData.personal.heightInches) {
                heightText = `${biodataData.personal.heightFeet}'${biodataData.personal.heightInches}"`;
            }
            
            const photoSrc = biodataData.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
            
            // Generate education HTML with proper formatting
            let educationHTML = '';
            if (biodataData.education.length > 0) {
                educationHTML = biodataData.education.map(edu => {
                    const parts = edu.split(' | ');
                    let formattedEdu = '';
                    if (parts.length === 1) {
                        formattedEdu = parts[0];
                    } else if (parts.length === 2) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span> | ${parts[1]}`;
                    } else if (parts.length === 3) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span> | ${parts[1]} | ${parts[2]}`;
                    } else if (parts.length >= 4) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span> | ${parts[1]} | ${parts[2]} | ${parts[3]}`;
                    }
                    return `<div style="margin-bottom: 5px; padding: 8px; background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                        <div style="font-size: 11px;">${formattedEdu}</div>
                    </div>`;
                }).join('');
            }
            
            return `
                <div class="template-3 template-content">
                    <!-- Header -->
                    <div class="header-section">
                        <div class="photo-frame">
                            <img src="${photoSrc}" alt="Profile Photo" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <h1 style="margin: 0 0 5px 0; font-size: 28px; font-weight: 700;">${biodataData.personal.fullName}</h1>
                        <div style="font-size: 14px; opacity: 0.9;">Matrimonial Profile</div>
                    </div>
                    
                    <!-- Two Column Layout -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                        <div>
                            <!-- Personal Info -->
                            <h3 class="section-title">About Me</h3>
                            <table style="width: 100%; font-size: 11.5px;">
                                <tr><td style="width: 120px; font-weight: 600; padding: 6px 0;">Age:</td><td>${biodataData.personal.age || ''} Years</td></tr>
                                <tr><td style="font-weight: 600; padding: 6px 0;">Religion:</td><td>${biodataData.personal.religion}</td></tr>
                                <tr><td style="font-weight: 600; padding: 6px 0;">Marital Status:</td><td>${biodataData.personal.maritalStatus}</td></tr>
                                ${heightText ? `
                                <tr><td style="font-weight: 600; padding: 6px 0;">Height:</td><td>${heightText}</td></tr>
                                ` : ''}
                            </table>
                            
                            <!-- Family -->
                            <h3 class="section-title" style="margin-top: 25px;">Family</h3>
                            <div style="font-size: 11.5px;">
                                <div><strong>Father:</strong> ${biodataData.family.fatherName} (${biodataData.family.fatherOccupation})</div>
                                <div><strong>Mother:</strong> ${biodataData.family.motherName} ${biodataData.family.motherOccupation ? '(' + biodataData.family.motherOccupation + ')' : ''}</div>
                            </div>
                        </div>
                        
                        <div>
                            <!-- Education & Career -->
                            <h3 class="section-title">Education & Career</h3>
                            <div style="font-size: 11.5px;">
                                ${educationHTML || '<div style="color: #666; font-size: 10.5px;">No education information provided</div>'}
                                ${biodataData.annualIncome ? `<div style="margin-top: 10px; padding: 10px; background: linear-gradient(135deg, rgba(106, 17, 203, 0.1), rgba(37, 117, 252, 0.1)); border-radius: 8px;"><strong>Annual Income:</strong> ${biodataData.annualIncome}</div>` : ''}
                            </div>
                            
                            <!-- Contact -->
                            <h3 class="section-title" style="margin-top: 25px;">Contact</h3>
                            <div style="font-size: 11.5px;">
                                <div><i class="fas fa-phone"></i> ${biodataData.contact.phone}</div>
                                <div><i class="fas fa-envelope"></i> ${biodataData.contact.email}</div>
                                <div><i class="fas fa-map-marker-alt"></i> ${biodataData.contact.address}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Skills & Hobbies -->
                    <h3 class="section-title" style="margin-top: 25px;">Interests & Skills</h3>
                    <div style="font-size: 11.5px; margin-bottom: 20px;">
                        ${biodataData.hobbies.map(hobby => `<span class="skill-tag">${hobby}</span>`).join('')}
                        ${biodataData.languages.map(lang => `<span class="skill-tag">${lang}</span>`).join('')}
                    </div>
                    
                    <!-- Expectations -->
                    <h3 class="section-title">Partner Expectations</h3>
                    <div style="font-size: 11.5px; line-height: 1.6; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                        ${biodataData.expectations}
                    </div>
                    
                    <div class="footer">
                        This biodata is prepared for matrimonial purposes only.<br>
                        Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                    </div>
                </div>
            `;
        }

        function generateBiodataTemplate4(theme) {
            // Calculate height text
            let heightText = '';
            if (biodataData.personal.heightFeet && biodataData.personal.heightInches) {
                heightText = `${biodataData.personal.heightFeet}'${biodataData.personal.heightInches}"`;
            }
            
            // Format date
            const formatDate = (dateString) => {
                if (!dateString) return 'Not specified';
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
            };
            
            const photoSrc = biodataData.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
            
            // Generate education HTML with proper formatting
            let educationHTML = '';
            if (biodataData.education.length > 0) {
                educationHTML = biodataData.education.map(edu => {
                    const parts = edu.split(' | ');
                    let formattedEdu = '';
                    if (parts.length === 1) {
                        formattedEdu = parts[0];
                    } else if (parts.length === 2) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span><br><span style="color: #666; font-size: 10.5px;">${parts[1]}</span>`;
                    } else if (parts.length === 3) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span><br><span style="color: #666; font-size: 10.5px;">${parts[1]} | ${parts[2]}</span>`;
                    } else if (parts.length >= 4) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span><br><span style="color: #666; font-size: 10.5px;">${parts[1]} | ${parts[2]} | ${parts[3]}</span>`;
                    }
                    return `<div class="timeline-item">
                        <div style="font-size: 11px;">${formattedEdu}</div>
                    </div>`;
                }).join('');
            }
            
            return `
                <div class="template-4 template-content">
                    <!-- Header -->
                    <div class="header-section">
                        <div class="photo-frame">
                            <img src="${photoSrc}" alt="Profile Photo" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div>
                            <h1 style="margin: 0 0 5px 0; font-size: 24px; font-weight: 700;">${biodataData.personal.fullName}</h1>
                            <div style="font-size: 14px; color: #666; margin-bottom: 15px;">Wedding Biodata</div>
                            <div style="font-size: 11px; color: #666;">
                                <div>${biodataData.contact.phone} • ${biodataData.contact.email}</div>
                                <div>${biodataData.contact.address}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <!-- Left Column -->
                        <div>
                            <!-- Personal -->
                            <h3 class="section-title">PERSONAL</h3>
                            <div class="timeline-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Age</div>
                                <div style="font-size: 11px;">${biodataData.personal.age || ''} Years</div>
                            </div>
                            <div class="timeline-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Date of Birth</div>
                                <div style="font-size: 11px;">${formatDate(biodataData.personal.dob)}</div>
                            </div>
                            ${heightText ? `
                            <div class="timeline-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Height</div>
                                <div style="font-size: 11px;">${heightText}</div>
                            </div>
                            ` : ''}
                            <div class="timeline-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Religion</div>
                                <div style="font-size: 11px;">${biodataData.personal.religion}</div>
                            </div>
                            <div class="timeline-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Marital Status</div>
                                <div style="font-size: 11px;">${biodataData.personal.maritalStatus}</div>
                            </div>
                            
                            <!-- Family -->
                            <h3 class="section-title" style="margin-top: 30px;">FAMILY</h3>
                            <div class="timeline-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Father</div>
                                <div style="font-size: 11px;">${biodataData.family.fatherName}</div>
                                <div style="font-size: 10.5px; color: #666;">${biodataData.family.fatherOccupation}</div>
                            </div>
                            <div class="timeline-item">
                                <div style="font-weight: 600; font-size: 11.5px;">Mother</div>
                                <div style="font-size: 11px;">${biodataData.family.motherName}</div>
                                ${biodataData.family.motherOccupation ? `<div style="font-size: 10.5px; color: #666;">${biodataData.family.motherOccupation}</div>` : ''}
                            </div>
                        </div>
                        
                        <!-- Right Column -->
                        <div>
                            <!-- Education -->
                            <h3 class="section-title">EDUCATION</h3>
                            ${educationHTML || '<div style="color: #666; font-size: 10.5px;">No education information provided</div>'}
                            
                            ${biodataData.annualIncome ? `
                            <div class="timeline-item" style="background: #f5f5f5; padding: 12px; border-radius: 6px;">
                                <div style="font-weight: 600; font-size: 11.5px;">Annual Income</div>
                                <div style="font-size: 12px;">${biodataData.annualIncome}</div>
                            </div>
                            ` : ''}
                            
                            <!-- Expectations -->
                            <h3 class="section-title" style="margin-top: 30px;">EXPECTATIONS</h3>
                            <div style="font-size: 11px; line-height: 1.6; color: #444;">
                                ${biodataData.expectations}
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer">
                        Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                    </div>
                </div>
            `;
        }

        function generateBiodataTemplate5(theme) {
            // Calculate height text
            let heightText = '';
            if (biodataData.personal.heightFeet && biodataData.personal.heightInches) {
                const totalInches = parseInt(biodataData.personal.heightFeet) * 12 + parseInt(biodataData.personal.heightInches);
                const cm = Math.round(totalInches * 2.54);
                heightText = `${biodataData.personal.heightFeet}'${biodataData.personal.heightInches}" (${cm} cm)`;
            }
            
            // Format date
            const formatDate = (dateString) => {
                if (!dateString) return 'Not specified';
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            };
            
            const photoSrc = biodataData.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
            
            // Generate education HTML with proper formatting
            let educationHTML = '';
            if (biodataData.education.length > 0) {
                educationHTML = biodataData.education.map(edu => {
                    const parts = edu.split(' | ');
                    let formattedEdu = '';
                    if (parts.length === 1) {
                        formattedEdu = parts[0];
                    } else if (parts.length === 2) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span> | ${parts[1]}`;
                    } else if (parts.length === 3) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span> | ${parts[1]} | ${parts[2]}`;
                    } else if (parts.length >= 4) {
                        formattedEdu = `<span style="font-weight: 600;">${parts[0]}</span> | ${parts[1]} | ${parts[2]} | ${parts[3]}</span>`;
                    }
                    return `<div style="margin-bottom: 8px; padding-left: 15px; position: relative;">
                        <div style="position: absolute; left: 0; top: 6px; width: 6px; height: 6px; background: #D4AF37; border-radius: 50%;"></div>
                        <div style="font-size: 11px;">${formattedEdu}</div>
                    </div>`;
                }).join('');
            }
            
            return `
                <div class="template-5 template-content">
                    <!-- Header -->
                    <div class="header-section">
                        <div class="photo-frame">
                            <img src="${photoSrc}" alt="Profile Photo" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <h1 style="margin: 0 0 8px 0; font-size: 32px; font-weight: 700; letter-spacing: 2px;">${biodataData.personal.fullName}</h1>
                        <div style="font-size: 14px; letter-spacing: 1px;">WEDDING BIODATA</div>
                    </div>
                    
                    <!-- Content Grid -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <!-- Left Column -->
                        <div>
                            <!-- Personal Information -->
                            <h3 class="section-title">Personal Information</h3>
                            <table style="width: 100%; font-size: 11.5px;">
                                <tr><td style="width: 140px; font-weight: 600; padding: 8px 0;">Date of Birth:</td><td>${formatDate(biodataData.personal.dob)}</td></tr>
                                <tr><td style="font-weight: 600; padding: 8px 0;">Age:</td><td>${biodataData.personal.age || ''} Years</td></tr>
                                ${heightText ? `<tr><td style="font-weight: 600; padding: 8px 0;">Height:</td><td>${heightText}</td></tr>` : ''}
                                <tr><td style="font-weight: 600; padding: 8px 0;">Religion:</td><td>${biodataData.personal.religion}</td></tr>
                                <tr><td style="font-weight: 600; padding: 8px 0;">Marital Status:</td><td>${biodataData.personal.maritalStatus}</td></tr>
                                <tr><td style="font-weight: 600; padding: 8px 0;">Nationality:</td><td>${biodataData.personal.nationality}</td></tr>
                            </table>
                            
                            <div class="divider"></div>
                            
                            <!-- Family Information -->
                            <h3 class="section-title">Family Information</h3>
                            <div style="font-size: 11.5px;">
                                <div><strong>Father:</strong> ${biodataData.family.fatherName}</div>
                                <div style="margin-left: 15px; color: #aaa;">${biodataData.family.fatherOccupation}</div>
                                <div><strong>Mother:</strong> ${biodataData.family.motherName}</div>
                                ${biodataData.family.motherOccupation ? `<div style="margin-left: 15px; color: #aaa;">${biodataData.family.motherOccupation}</div>` : ''}
                            </div>
                        </div>
                        
                        <!-- Right Column -->
                        <div>
                            <!-- Education & Career -->
                            <h3 class="section-title">Education & Career</h3>
                            <div style="font-size: 11.5px;">
                                ${educationHTML || '<div style="color: #666; font-size: 10.5px;">No education information provided</div>'}
                                ${biodataData.annualIncome ? `
                                <div style="margin-top: 15px; padding: 10px; background: rgba(212, 175, 55, 0.1); border-radius: 6px; border: 1px solid #D4AF37;">
                                    <strong>Annual Income:</strong> ${biodataData.annualIncome}
                                </div>
                                ` : ''}
                            </div>
                            
                            <div class="divider"></div>
                            
                            <!-- Contact Details -->
                            <h3 class="section-title">Contact Details</h3>
                            <div style="font-size: 11.5px;">
                                <div><i class="fas fa-phone" style="color: #D4AF37;"></i> ${biodataData.contact.phone}</div>
                                <div><i class="fas fa-envelope" style="color: #D4AF37;"></i> ${biodataData.contact.email}</div>
                                <div><i class="fas fa-map-marker-alt" style="color: #D4AF37;"></i> ${biodataData.contact.address}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Hobbies & Languages -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 25px 0;">
                        <div>
                            <h3 class="section-title">Hobbies</h3>
                            <div style="font-size: 11.5px;">
                                ${biodataData.hobbies.map(hobby => `<div style="margin-bottom: 5px; padding-left: 15px; position: relative;">
                                    <div style="position: absolute; left: 0; top: 6px; width: 6px; height: 6px; background: #D4AF37; border-radius: 50%;"></div>
                                    ${hobby}
                                </div>`).join('')}
                            </div>
                        </div>
                        <div>
                            <h3 class="section-title">Languages</h3>
                            <div style="font-size: 11.5px;">
                                ${biodataData.languages.map(lang => `<div style="margin-bottom: 5px; padding-left: 15px; position: relative;">
                                    <div style="position: absolute; left: 0; top: 6px; width: 6px; height: 6px; background: #D4AF37; border-radius: 50%;"></div>
                                    ${lang}
                                </div>`).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Expectations -->
                    <h3 class="section-title">Partner Expectations</h3>
                    <div style="font-size: 11.5px; line-height: 1.6; padding: 20px; background: rgba(212, 175, 55, 0.05); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.3);">
                        ${biodataData.expectations}
                    </div>
                    
                    <div class="footer" style="border-top: 1px solid #D4AF37; color: #aaa;">
                        This biodata is prepared for matrimonial purposes only.<br>
                        Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                    </div>
                </div>
            `;
        }

        function generateResume() {
            console.log("Generating resume...");
            
            // Collect data from resume form
            collectResumeData();
            
            // Validate required fields
            if (!validateResumeForm()) {
                return;
            }
            
            // Generate HTML preview
            generateResumeHTML();
            
            // Show success message
            showSuccessMessage('Resume generated successfully! Scroll down to preview.');
            
            // Show preview
            navigateToSection('resumePreview');
        }

        function collectResumeData() {
            // Personal data
            resumeData.personal = {
                fullName: document.getElementById('resumeFullName').value,
                title: document.getElementById('resumeTitle').value,
                email: document.getElementById('resumeEmail').value,
                phone: document.getElementById('resumePhone').value,
                location: document.getElementById('resumeLocation').value,
                linkedin: document.getElementById('resumeLinkedIn').value,
                github: document.getElementById('resumeGithub').value
            };
            
            // Professional summary
            resumeData.summary = document.getElementById('resumeSummary').value;
            
            // Collect experience data
            resumeData.experience = [];
            document.querySelectorAll('.experience-item').forEach(item => {
                const title = item.querySelector('.experience-title')?.value;
                const company = item.querySelector('.experience-company')?.value;
                const start = item.querySelector('.experience-start')?.value;
                const end = item.querySelector('.experience-end')?.value;
                const description = item.querySelector('.experience-description')?.value;
                
                if (title && company) {
                    resumeData.experience.push({
                        title,
                        company,
                        start,
                        end,
                        description
                    });
                }
            });
            
            // Collect education data
            resumeData.education = [];
            document.querySelectorAll('.education-item').forEach(item => {
                const degree = item.querySelector('.education-degree')?.value;
                const institution = item.querySelector('.education-institution')?.value;
                const duration = item.querySelector('.education-duration')?.value;
                const gpa = item.querySelector('.education-gpa')?.value;
                
                if (degree && institution) {
                    resumeData.education.push({
                        degree,
                        institution,
                        duration,
                        gpa
                    });
                }
            });
        }

        function validateResumeForm() {
            let isValid = true;
            const requiredFields = [
                { id: 'resumeFullName', name: 'Full Name' },
                { id: 'resumeTitle', name: 'Professional Title' },
                { id: 'resumeEmail', name: 'Email Address' },
                { id: 'resumePhone', name: 'Phone Number' },
                { id: 'resumeSummary', name: 'Professional Summary' }
            ];
            
            // Reset all field borders
            requiredFields.forEach(field => {
                const element = document.getElementById(field.id);
                if (element) {
                    element.style.borderColor = '#ddd';
                }
            });
            
            const errors = [];
            
            for (let field of requiredFields) {
                const element = document.getElementById(field.id);
                if (element && !element.value.trim()) {
                    isValid = false;
                    errors.push(field.name);
                    element.style.borderColor = '#ff4444';
                    
                    // Scroll to first error
                    if (errors.length === 1) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        element.focus();
                    }
                }
            }
            
            // Email validation
            const emailField = document.getElementById('resumeEmail');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    errors.push('Invalid Email Address');
                    emailField.style.borderColor = '#ff4444';
                }
            }
            
            if (!isValid) {
                showError(`Please fill all required fields: ${errors.join(', ')}`);
            }
            
            return isValid;
        }

        function generateResumeHTML() {
            const container = document.getElementById('a4Resume');
            const theme = resumeThemes.find(t => t.id === resumeData.theme) || resumeThemes[0];
            const template = resumeData.template || 'template-1';
            
            // Call appropriate template function
            if (template === 'template-1') {
                container.innerHTML = generateResumeTemplate1(theme);
            } else if (template === 'template-2') {
                container.innerHTML = generateResumeTemplate2(theme);
            } else if (template === 'template-3') {
                container.innerHTML = generateResumeTemplate3(theme);
            } else if (template === 'template-4') {
                container.innerHTML = generateResumeTemplate4(theme);
            } else if (template === 'template-5') {
                container.innerHTML = generateResumeTemplate5(theme);
            }
        }

        function generateResumeTemplate1(theme) {
            // Template 1 for resume
            const photoSrc = resumeData.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
            
            return `
                <div class="template-1 template-content">
                    <div style="background: linear-gradient(135deg, #2c3e50, #4a6491); color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                        <div style="display: grid; grid-template-columns: 120px 1fr; gap: 25px; align-items: center;">
                            <div style="width: 120px; height: 140px; border-radius: 6px; overflow: hidden; border: 4px solid white;">
                                <img src="${photoSrc}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            <div>
                                <h1 style="margin: 0 0 5px 0; font-size: 26px; font-weight: 700;">${resumeData.personal.fullName}</h1>
                                <div style="font-size: 16px; color: #ecf0f1; margin-bottom: 15px;">${resumeData.personal.title}</div>
                                <div style="font-size: 11px; line-height: 1.6;">
                                    <div><i class="fas fa-envelope"></i> ${resumeData.personal.email}</div>
                                    <div><i class="fas fa-phone"></i> ${resumeData.personal.phone}</div>
                                    <div><i class="fas fa-map-marker-alt"></i> ${resumeData.personal.location}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 25px;">
                        <!-- Left Column -->
                        <div>
                            <!-- Summary -->
                            <h3 class="section-title">PROFESSIONAL SUMMARY</h3>
                            <div style="font-size: 11.5px; line-height: 1.6; color: #444; margin-bottom: 25px;">
                                ${resumeData.summary}
                            </div>
                            
                            <!-- Experience -->
                            <h3 class="section-title">WORK EXPERIENCE</h3>
                            ${resumeData.experience.map(exp => `
                            <div style="margin-bottom: 20px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <div>
                                        <div style="font-weight: 600; color: #2c3e50; font-size: 13px;">${exp.title}</div>
                                        <div style="color: #3498db; font-size: 12px;">${exp.company}</div>
                                    </div>
                                    <div style="color: #666; font-size: 11px; font-weight: 500;">${exp.start} - ${exp.end}</div>
                                </div>
                                <div style="font-size: 11px; color: #555; line-height: 1.5;">
                                    ${exp.description ? exp.description.replace(/\n/g, '<br>') : ''}
                                </div>
                            </div>
                            `).join('')}
                            
                            <!-- Education -->
                            <h3 class="section-title" style="margin-top: 25px;">EDUCATION</h3>
                            ${resumeData.education.map(edu => `
                            <div style="margin-bottom: 15px;">
                                <div style="font-weight: 600; color: #2c3e50; font-size: 13px;">${edu.degree}</div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div style="color: #3498db; font-size: 12px;">${edu.institution}</div>
                                    <div style="color: #666; font-size: 11px;">${edu.duration}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                        
                        <!-- Right Column -->
                        <div>
                            <!-- Skills -->
                            <h3 class="section-title">SKILLS</h3>
                            <div style="font-size: 11.5px; margin-bottom: 25px;">
                                ${resumeData.skills.map(skill => `
                                <div style="margin-bottom: 8px; padding-left: 15px; position: relative;">
                                    <div style="position: absolute; left: 0; top: 6px; width: 6px; height: 6px; background: #3498db; border-radius: 50%;"></div>
                                    ${skill}
                                </div>
                                `).join('')}
                            </div>
                            
                            <!-- Languages -->
                            <h3 class="section-title">LANGUAGES</h3>
                            <div style="font-size: 11.5px;">
                                ${resumeData.languages.map(lang => `
                                <div style="margin-bottom: 8px;">
                                    <div style="font-weight: 600; color: #2c3e50;">${lang}</div>
                                </div>
                                `).join('')}
                            </div>
                            
                            <!-- Contact Links -->
                            <h3 class="section-title" style="margin-top: 25px;">CONTACT</h3>
                            <div style="font-size: 11px; line-height: 1.6;">
                                ${resumeData.personal.linkedin ? `<div><i class="fab fa-linkedin"></i> ${resumeData.personal.linkedin.replace('https://', '')}</div>` : ''}
                                ${resumeData.personal.github ? `<div><i class="fab fa-github"></i> ${resumeData.personal.github.replace('https://', '')}</div>` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer">
                        Professional Resume | Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                    </div>
                </div>
            `;
        }

        function generateResumeTemplate2(theme) {
            const photoSrc = resumeData.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
            
            return `
                <div class="template-2 template-content">
                    <!-- Header -->
                    <div style="display: grid; grid-template-columns: 140px 1fr; gap: 30px; padding-bottom: 20px; border-bottom: 3px solid #1a3c6e; margin-bottom: 25px;">
                        <div style="width: 140px; height: 160px; border-radius: 8px; overflow: hidden; border: 3px solid #1a3c6e;">
                            <img src="${photoSrc}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div>
                            <h1 style="margin: 0 0 5px 0; font-size: 24px; font-weight: 700; color: #1a3c6e;">${resumeData.personal.fullName}</h1>
                            <div style="font-size: 16px; color: #2c5282; margin-bottom: 15px; font-weight: 500;">${resumeData.personal.title}</div>
                            <div style="font-size: 11px; color: #666; line-height: 1.6;">
                                <div><i class="fas fa-envelope"></i> ${resumeData.personal.email}</div>
                                <div><i class="fas fa-phone"></i> ${resumeData.personal.phone}</div>
                                <div><i class="fas fa-map-marker-alt"></i> ${resumeData.personal.location}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Two column layout -->
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 25px;">
                        <div>
                            <!-- Professional Summary -->
                            <div class="info-item" style="margin-bottom: 25px;">
                                <div class="section-title">PROFESSIONAL PROFILE</div>
                                <div style="font-size: 11.5px; line-height: 1.6; color: #444;">
                                    ${resumeData.summary}
                                </div>
                            </div>
                            
                            <!-- Work Experience -->
                            <div class="section-title">WORK EXPERIENCE</div>
                            ${resumeData.experience.map(exp => `
                            <div class="info-item" style="margin-bottom: 20px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <div style="font-weight: 600; color: #1a3c6e; font-size: 13px;">${exp.title}</div>
                                    <div style="color: #666; font-size: 11px;">${exp.start} - ${exp.end}</div>
                                </div>
                                <div style="color: #2c5282; font-size: 12px; font-weight: 500; margin-bottom: 5px;">${exp.company}</div>
                                <div style="font-size: 11px; color: #555; line-height: 1.5;">
                                    ${exp.description ? exp.description.replace(/\n/g, '<br>') : ''}
                                </div>
                            </div>
                            `).join('')}
                            
                            <!-- Education -->
                            <div class="section-title" style="margin-top: 25px;">EDUCATION</div>
                            ${resumeData.education.map(edu => `
                            <div class="info-item" style="margin-bottom: 15px;">
                                <div style="font-weight: 600; color: #1a3c6e; font-size: 13px;">${edu.degree}</div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div style="color: #2c5282; font-size: 12px;">${edu.institution}</div>
                                    <div style="color: #666; font-size: 11px;">${edu.duration}</div>
                                </div>
                                ${edu.gpa ? `<div style="color: #666; font-size: 11px;">GPA: ${edu.gpa}</div>` : ''}
                            </div>
                            `).join('')}
                        </div>
                        
                        <div>
                            <!-- Skills -->
                            <div class="section-title">SKILLS</div>
                            <div style="margin-bottom: 25px;">
                                ${resumeData.skills.map(skill => `
                                <div style="margin-bottom: 10px;">
                                    <div style="font-size: 11.5px; color: #1a3c6e; font-weight: 500;">${skill}</div>
                                    <div style="height: 4px; background: #e8f0fe; border-radius: 2px; margin-top: 3px;">
                                        <div style="width: 85%; height: 100%; background: #1a3c6e; border-radius: 2px;"></div>
                                    </div>
                                </div>
                                `).join('')}
                            </div>
                            
                            <!-- Languages -->
                            <div class="section-title">LANGUAGES</div>
                            <div style="margin-bottom: 25px;">
                                ${resumeData.languages.map(lang => `
                                <div style="margin-bottom: 8px;">
                                    <div style="font-size: 11.5px; font-weight: 500;">${lang}</div>
                                </div>
                                `).join('')}
                            </div>
                            
                            <!-- Contact -->
                            <div class="section-title">CONTACT LINKS</div>
                            <div style="font-size: 11px; line-height: 1.6;">
                                ${resumeData.personal.linkedin ? `
                                <div style="margin-bottom: 5px;">
                                    <i class="fab fa-linkedin" style="color: #0077b5;"></i> 
                                    <span style="color: #1a3c6e;">LinkedIn</span>
                                    <div style="font-size: 10px; color: #666;">${resumeData.personal.linkedin.replace('https://', '')}</div>
                                </div>
                                ` : ''}
                                
                                ${resumeData.personal.github ? `
                                <div style="margin-bottom: 5px;">
                                    <i class="fab fa-github" style="color: #333;"></i> 
                                    <span style="color: #1a3c6e;">GitHub</span>
                                    <div style="font-size: 10px; color: #666;">${resumeData.personal.github.replace('https://', '')}</div>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer">
                        ${resumeData.personal.fullName} • Resume • ${new Date().getFullYear()}
                    </div>
                </div>
            `;
        }

        function generateResumeTemplate3(theme) {
            // Template 3 - Creative Colorful
            const photoSrc = resumeData.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
            
            return `
                <div class="template-3 template-content">
                    <!-- Header -->
                    <div class="header-section">
                        <div class="photo-frame">
                            <img src="${photoSrc}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <h1 style="margin: 0 0 5px 0; font-size: 28px; font-weight: 700;">${resumeData.personal.fullName}</h1>
                        <div style="font-size: 16px; opacity: 0.9;">${resumeData.personal.title}</div>
                        <div style="font-size: 11px; margin-top: 10px; opacity: 0.8;">
                            <div>${resumeData.personal.email} • ${resumeData.personal.phone}</div>
                            <div>${resumeData.personal.location}</div>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 25px;">
                        <div>
                            <!-- Summary -->
                            <h3 class="section-title">PROFESSIONAL SUMMARY</h3>
                            <div style="font-size: 11.5px; line-height: 1.6; color: #444; margin-bottom: 25px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                                ${resumeData.summary}
                            </div>
                            
                            <!-- Experience -->
                            <h3 class="section-title">WORK EXPERIENCE</h3>
                            ${resumeData.experience.map(exp => `
                            <div style="margin-bottom: 20px; padding: 15px; background: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.08);">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <div>
                                        <div style="font-weight: 600; color: #6a11cb; font-size: 13px;">${exp.title}</div>
                                        <div style="color: #2575fc; font-size: 12px;">${exp.company}</div>
                                    </div>
                                    <div style="color: #666; font-size: 11px; font-weight: 500;">${exp.start} - ${exp.end}</div>
                                </div>
                                <div style="font-size: 11px; color: #555; line-height: 1.5;">
                                    ${exp.description ? exp.description.replace(/\n/g, '<br>') : ''}
                                </div>
                            </div>
                            `).join('')}
                            
                            <!-- Education -->
                            <h3 class="section-title" style="margin-top: 25px;">EDUCATION</h3>
                            ${resumeData.education.map(edu => `
                            <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.08);">
                                <div style="font-weight: 600; color: #6a11cb; font-size: 13px;">${edu.degree}</div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div style="color: #2575fc; font-size: 12px;">${edu.institution}</div>
                                    <div style="color: #666; font-size: 11px;">${edu.duration}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                        
                        <div>
                            <!-- Skills -->
                            <h3 class="section-title">SKILLS</h3>
                            <div style="margin-bottom: 25px;">
                                ${resumeData.skills.map(skill => `
                                <span class="skill-tag">${skill}</span>
                                `).join('')}
                            </div>
                            
                            <!-- Languages -->
                            <h3 class="section-title">LANGUAGES</h3>
                            <div style="margin-bottom: 25px;">
                                ${resumeData.languages.map(lang => `
                                <div style="margin-bottom: 8px;">
                                    <span class="skill-tag">${lang}</span>
                                </div>
                                `).join('')}
                            </div>
                            
                            <!-- Contact -->
                            <h3 class="section-title">LINKS</h3>
                            <div style="font-size: 11px; line-height: 1.6;">
                                ${resumeData.personal.linkedin ? `<div style="margin-bottom: 8px;"><i class="fab fa-linkedin"></i> ${resumeData.personal.linkedin.replace('https://', '')}</div>` : ''}
                                ${resumeData.personal.github ? `<div><i class="fab fa-github"></i> ${resumeData.personal.github.replace('https://', '')}</div>` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer">
                        Creative Resume | ${new Date().getFullYear()}
                    </div>
                </div>
            `;
        }

        function generateResumeTemplate4(theme) {
            // Template 4 - Minimalist Clean
            const photoSrc = resumeData.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
            
            return `
                <div class="template-4 template-content">
                    <!-- Header -->
                    <div class="header-section">
                        <div class="photo-frame">
                            <img src="${photoSrc}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div>
                            <h1 style="margin: 0 0 5px 0; font-size: 24px; font-weight: 700;">${resumeData.personal.fullName}</h1>
                            <div style="font-size: 16px; color: #333; margin-bottom: 15px;">${resumeData.personal.title}</div>
                            <div style="font-size: 11px; color: #666;">
                                <div>${resumeData.personal.email}</div>
                                <div>${resumeData.personal.phone} | ${resumeData.personal.location}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div>
                        <!-- Summary -->
                        <h3 class="section-title">SUMMARY</h3>
                        <div style="font-size: 11.5px; line-height: 1.6; color: #444; margin-bottom: 25px;">
                            ${resumeData.summary}
                        </div>
                        
                        <!-- Experience -->
                        <h3 class="section-title">EXPERIENCE</h3>
                        ${resumeData.experience.map(exp => `
                        <div class="timeline-item">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                                <div style="font-weight: 600; color: #333; font-size: 13px;">${exp.title}</div>
                                <div style="color: #666; font-size: 11px;">${exp.start} - ${exp.end}</div>
                            </div>
                            <div style="color: #333; font-size: 12px; font-weight: 500; margin-bottom: 5px;">${exp.company}</div>
                            <div style="font-size: 11px; color: #555; line-height: 1.5;">
                                ${exp.description ? exp.description.replace(/\n/g, '<br>') : ''}
                            </div>
                        </div>
                        `).join('')}
                        
                        <!-- Education -->
                        <h3 class="section-title" style="margin-top: 25px;">EDUCATION</h3>
                        ${resumeData.education.map(edu => `
                        <div class="timeline-item">
                            <div style="font-weight: 600; color: #333; font-size: 13px;">${edu.degree}</div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="color: #333; font-size: 12px;">${edu.institution}</div>
                                <div style="color: #666; font-size: 11px;">${edu.duration}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
                            </div>
                        </div>
                        `).join('')}
                        
                        <!-- Skills -->
                        <h3 class="section-title" style="margin-top: 25px;">SKILLS</h3>
                        <div style="font-size: 11.5px; margin-bottom: 25px;">
                            ${resumeData.skills.map(skill => `
                            <div style="display: inline-block; margin: 0 10px 10px 0; padding: 4px 12px; background: #f5f5f5; border-radius: 3px;">
                                ${skill}
                            </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="footer">
                        Minimalist Resume
                    </div>
                </div>
            `;
        }

        function generateResumeTemplate5(theme) {
            // Template 5 - Luxury Gold
            const photoSrc = resumeData.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
            
            return `
                <div class="template-5 template-content">
                    <!-- Header -->
                    <div class="header-section">
                        <div class="photo-frame">
                            <img src="${photoSrc}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <h1 style="margin: 0 0 8px 0; font-size: 32px; font-weight: 700; letter-spacing: 2px;">${resumeData.personal.fullName}</h1>
                        <div style="font-size: 16px; letter-spacing: 1px; color: #D4AF37;">${resumeData.personal.title}</div>
                        <div style="font-size: 11px; margin-top: 15px; color: #aaa;">
                            <div>${resumeData.personal.email} | ${resumeData.personal.phone}</div>
                            <div>${resumeData.personal.location}</div>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                        <div>
                            <!-- Summary -->
                            <h3 class="section-title">PROFESSIONAL SUMMARY</h3>
                            <div style="font-size: 11.5px; line-height: 1.6; color: #444; margin-bottom: 25px; padding: 20px; background: rgba(212, 175, 55, 0.05); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
                                ${resumeData.summary}
                            </div>
                            
                            <!-- Experience -->
                            <h3 class="section-title">CAREER EXPERIENCE</h3>
                            ${resumeData.experience.map(exp => `
                            <div style="margin-bottom: 25px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <div>
                                        <div style="font-weight: 600; color: #000; font-size: 13px;">${exp.title}</div>
                                        <div style="color: #D4AF37; font-size: 12px;">${exp.company}</div>
                                    </div>
                                    <div style="color: #666; font-size: 11px; font-weight: 500;">${exp.start} - ${exp.end}</div>
                                </div>
                                <div style="font-size: 11px; color: #555; line-height: 1.5;">
                                    ${exp.description ? exp.description.replace(/\n/g, '<br>') : ''}
                                </div>
                            </div>
                            <div class="divider"></div>
                            `).join('')}
                            
                            <!-- Education -->
                            <h3 class="section-title" style="margin-top: 25px;">EDUCATION</h3>
                            ${resumeData.education.map(edu => `
                            <div style="margin-bottom: 20px;">
                                <div style="font-weight: 600; color: #000; font-size: 13px;">${edu.degree}</div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div style="color: #D4AF37; font-size: 12px;">${edu.institution}</div>
                                    <div style="color: #666; font-size: 11px;">${edu.duration}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                        
                        <div>
                            <!-- Skills -->
                            <h3 class="section-title">SKILLS</h3>
                            <div style="font-size: 11.5px; margin-bottom: 30px;">
                                ${resumeData.skills.map(skill => `
                                <div style="margin-bottom: 10px; padding-left: 15px; position: relative;">
                                    <div style="position: absolute; left: 0; top: 6px; width: 6px; height: 6px; background: #D4AF37; border-radius: 50%;"></div>
                                    ${skill}
                                </div>
                                `).join('')}
                            </div>
                            
                            <!-- Languages -->
                            <h3 class="section-title">LANGUAGES</h3>
                            <div style="font-size: 11.5px; margin-bottom: 30px;">
                                ${resumeData.languages.map(lang => `
                                <div style="margin-bottom: 10px;">
                                    <div style="font-weight: 500; color: #000;">${lang}</div>
                                </div>
                                `).join('')}
                            </div>
                            
                            <!-- Contact -->
                            <h3 class="section-title">CONTACT</h3>
                            <div style="font-size: 11px; line-height: 1.6;">
                                ${resumeData.personal.linkedin ? `<div style="margin-bottom: 8px;"><i class="fab fa-linkedin" style="color: #D4AF37;"></i> LinkedIn</div>` : ''}
                                ${resumeData.personal.github ? `<div><i class="fab fa-github" style="color: #D4AF37;"></i> GitHub</div>` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer" style="border-top: 1px solid #D4AF37;">
                        Professional Resume | ${new Date().getFullYear()}
                    </div>
                </div>
            `;
        }

        function printDocument(type) {
            window.print();
        }

        async function downloadPDF(type) {
            const pdfLoading = document.getElementById('pdfLoading');
            pdfLoading.classList.add('active');
            
            try {
                let containerId, fileNamePrefix, documentName;
                
                if (type === 'biodata') {
                    containerId = 'a4Biodata';
                    fileNamePrefix = 'Wedding_Biodata';
                    documentName = biodataData.personal.fullName || 'Biodata';
                } else {
                    containerId = 'a4Resume';
                    fileNamePrefix = 'Professional_Resume';
                    documentName = resumeData.personal.fullName || 'Resume';
                }
                
                const element = document.getElementById(containerId);
                const fileName = `${fileNamePrefix}_${documentName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
                
                // Wait a bit for DOM to update
                await new Promise(resolve => setTimeout(resolve, 100));
                
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                    onclone: function(clonedDoc) {
                        const clonedElement = clonedDoc.getElementById(containerId);
                        if (clonedElement) {
                            clonedElement.style.boxShadow = 'none';
                            clonedElement.style.border = 'none';
                            clonedElement.style.margin = '0';
                            clonedElement.style.padding = '0';
                        }
                    }
                });
                
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                
                const pdfWidth = 210; // A4 width in mm
                const pdfHeight = 297; // A4 height in mm
                
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                const imgWidthPdf = imgWidth * ratio;
                const imgHeightPdf = imgHeight * ratio;
                
                const xPos = (pdfWidth - imgWidthPdf) / 2;
                const yPos = 5;
                
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'JPEG', xPos, yPos, imgWidthPdf, imgHeightPdf);
                
                // Add metadata
                pdf.setProperties({
                    title: documentName,
                    subject: type === 'biodata' ? 'Wedding Biodata' : 'Professional Resume',
                    author: 'DocGen Pro',
                    creator: 'Biodata & Resume Generator'
                });
                
                pdf.save(fileName);
                
                pdfLoading.classList.remove('active');
                
                showSuccessMessage(`PDF downloaded successfully as "${fileName}"`);
                
            } catch (error) {
                console.error('Error generating PDF:', error);
                pdfLoading.classList.remove('active');
                showError('Error generating PDF. Please try again or use the print feature instead.');
            }
        }

        function initializeSampleData() {
            console.log("Loading sample data...");
            
            // Set sample data for biodata
            document.getElementById('biodataFullName').value = 'Priya Sharma';
            document.getElementById('biodataDob').value = '1995-06-15';
            document.getElementById('biodataGender').value = 'Female';
            document.getElementById('biodataHeightFeet').value = '5';
            document.getElementById('biodataHeightInches').value = '4';
            document.getElementById('biodataReligion').value = 'Hindu';
            document.getElementById('biodataCaste').value = 'Brahmin';
            document.getElementById('biodataMaritalStatus').value = 'Never Married';
            document.getElementById('biodataNationality').value = 'Indian';
            document.getElementById('biodataMotherTongue').value = 'Hindi';
            document.getElementById('biodataDiet').value = 'Vegetarian';
            document.getElementById('biodataHabits').value = 'Never';
            
            document.getElementById('biodataFatherName').value = 'Rajesh Sharma';
            document.getElementById('biodataFatherOccupation').value = 'Bank Manager';
            document.getElementById('biodataMotherName').value = 'Meena Sharma';
            document.getElementById('biodataMotherOccupation').value = 'Teacher';
            
            // Add sample education
            biodataData.education = [
                'B.Tech Computer Science | IIT Delhi | 2015-2019 | 8.5 CGPA',
                '12th Standard | ABC School | 2015 | 92%',
                '10th Standard | XYZ School | 2013 | 95%'
            ];
            
            // Render sample education
            biodataData.education.forEach(edu => {
                renderEducationItem(edu);
            });
            
            document.getElementById('biodataAnnualIncome').value = '₹15 LPA';
            
            // Add sample hobbies and languages
            biodataData.hobbies = ['Reading', 'Classical Dance', 'Cooking', 'Traveling'];
            biodataData.hobbies.forEach(hobby => {
                renderHobbyItem(hobby);
            });
            
            biodataData.languages = ['Hindi', 'English', 'Sanskrit'];
            biodataData.languages.forEach(lang => {
                renderLanguageItem(lang);
            });
            
            document.getElementById('biodataPhone').value = '+91 98765 43210';
            document.getElementById('biodataEmail').value = 'priya.sharma@example.com';
            document.getElementById('biodataAddress').value = '123 Green Park, New Delhi - 110016';
            document.getElementById('biodataExpectations').value = 'Looking for an educated, family-oriented professional with good moral values. Preferably aged 28-35, professionally established, respectful, and understanding.';
            
            // Set sample data for resume
            document.getElementById('resumeFullName').value = 'John Doe';
            document.getElementById('resumeTitle').value = 'Senior Software Engineer';
            document.getElementById('resumeEmail').value = 'john.doe@example.com';
            document.getElementById('resumePhone').value = '+1 (555) 123-4567';
            document.getElementById('resumeLocation').value = 'San Francisco, CA';
            document.getElementById('resumeLinkedIn').value = 'https://linkedin.com/in/johndoe';
            document.getElementById('resumeGithub').value = 'https://github.com/johndoe';
            
            document.getElementById('resumeSummary').value = 'Experienced Software Engineer with 5+ years in full-stack development. Specialized in React, Node.js, and cloud technologies. Passionate about building scalable applications and mentoring junior developers.';
            
            // Add sample skills and languages for resume
            resumeData.skills = ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Git'];
            resumeData.skills.forEach(skill => {
                renderSkillItem(skill);
            });
            
            resumeData.languages = ['English (Fluent)', 'Spanish (Intermediate)'];
            resumeData.languages.forEach(lang => {
                renderResumeLanguageItem(lang);
            });
            
            // Add sample experience and education
            resumeData.experience = [{
                title: 'Senior Software Engineer',
                company: 'Tech Solutions Inc.',
                start: 'June 2020',
                end: 'Present',
                description: '• Led a team of 5 developers in creating a new customer portal\n• Improved application performance by 40% through code optimization\n• Implemented CI/CD pipeline reducing deployment time by 60%'
            }];
            
            resumeData.education = [{
                degree: 'Master of Computer Science',
                institution: 'Stanford University',
                duration: '2018 - 2020',
                gpa: '3.8/4.0'
            }];
            
            // Trigger age calculation
            setTimeout(() => {
                const dobEvent = new Event('change');
                document.getElementById('biodataDob').dispatchEvent(dobEvent);
            }, 100);
            
            console.log("Sample data loaded");
        }
    
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveCareerPath } from '../utils/storage';
import { useTranslation } from 'react-i18next';

const AddCareerPath = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        industry: '',
        skills: ''
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = t('admin_panel.validation.title');
        if (!formData.description.trim()) newErrors.description = t('admin_panel.validation.description');
        if (!formData.industry.trim()) newErrors.industry = t('admin_panel.validation.industry');
        if (!formData.skills.trim()) newErrors.skills = t('admin_panel.validation.skills');
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Convert skills string to array and clean up
        const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');

        saveCareerPath({
            ...formData,
            skills: skillsArray
        });

        setSuccess(true);
        setTimeout(() => {
            navigate('/career-paths');
        }, 2000);
    };

    const industries = [
        t('industries.tabs.dev'),
        t('industries.tabs.data'),
        t('industries.tabs.marketing'),
        t('industries.tabs.design'),
        'Healthcare',
        'Finance',
        'Education'
    ];

    return (
        <div className={`container-fluid py-5 mt-5 ${isRtl ? 'text-end' : 'text-start'}`}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="bg-secondary p-4">
                                <h2 className="text-white mb-0 text-center fw-bold">
                                    <i className={`fas fa-plus-circle ${isRtl ? 'ml-2' : 'me-2'}`}></i>
                                    {t('admin_panel.add_title')}
                                </h2>
                            </div>
                            <div className="card-body p-4 p-md-5">
                                {success && (
                                    <div className={`alert alert-success alert-dismissible fade show mb-4 ${isRtl ? 'pe-5' : ''}`} role="alert">
                                        <i className={`fas fa-check-circle ${isRtl ? 'ml-2' : 'me-2'}`}></i>
                                        {t('admin_panel.success')}
                                        <button type="button" className={`btn-close ${isRtl ? 'start-0' : 'end-0'}`} onClick={() => setSuccess(false)}></button>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">{t('admin_panel.label_title')}</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className={`form-control border-2 ${errors.title ? 'is-invalid' : ''} ${isRtl ? 'text-end' : ''}`}
                                            placeholder={t('admin_panel.placeholder_title')}
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold">{t('admin_panel.label_industry')}</label>
                                        <select
                                            name="industry"
                                            className={`form-select border-2 ${errors.industry ? 'is-invalid' : ''} ${isRtl ? 'text-end' : ''}`}
                                            value={formData.industry}
                                            onChange={handleChange}
                                        >
                                            <option value="">{t('admin_panel.select_ind')}</option>
                                            {industries.map(ind => (
                                                <option key={ind} value={ind}>{ind}</option>
                                            ))}
                                        </select>
                                        {errors.industry && <div className="invalid-feedback">{errors.industry}</div>}
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold">{t('admin_panel.label_desc')}</label>
                                        <textarea
                                            name="description"
                                            className={`form-control border-2 ${errors.description ? 'is-invalid' : ''} ${isRtl ? 'text-end' : ''}`}
                                            rows="4"
                                            placeholder={t('admin_panel.placeholder_desc')}
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold">{t('admin_panel.label_skills')}</label>
                                        <input
                                            type="text"
                                            name="skills"
                                            className={`form-control border-2 ${errors.skills ? 'is-invalid' : ''} ${isRtl ? 'text-end' : ''}`}
                                            placeholder={t('admin_panel.placeholder_skills')}
                                            value={formData.skills}
                                            onChange={handleChange}
                                        />
                                        <small className="text-muted d-block mt-1">{t('recommend.skills_hint')}</small>
                                        {errors.skills && <div className="invalid-feedback">{errors.skills}</div>}
                                    </div>

                                    <div className={`d-flex gap-3 mt-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                        <button type="submit" className="btn btn-primary w-100 rounded-pill py-3 text-white fw-bold">
                                            {t('admin_panel.save')}
                                        </button>
                                        <button type="button" onClick={() => navigate('/career-paths')} className="btn btn-outline-secondary w-100 rounded-pill py-3 fw-bold">
                                            {t('admin_panel.cancel')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCareerPath;

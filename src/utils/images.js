export const careerImages = {
    'software': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'fullstack': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    'analyst': 'https://images.unsplash.com/photo-1551288049-bbbda1400a16',
    'data_analyst': 'https://images.unsplash.com/photo-1551288049-bbbda1400a16',
    'data': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    'marketing': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312',
    'marketing_spec': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312',
    'android': 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    'frontend': 'https://images.unsplash.com/photo-1547658719-da2b51169166',
    'backend': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    'devops': 'https://images.unsplash.com/photo-1667372333374-9d3d17336ed7',
    'ml_engineer': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    'data_scientist': 'https://images.unsplash.com/photo-1527474305487-b87b222841cc',
    'uiux': 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    'seo': 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9',
    'software_architect': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    'content_strat': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    'graphic_designer': 'https://images.unsplash.com/photo-1626785774573-4b799314346d',
    'motion_graphic': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    'social_media': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7'
};

export const DEFAULT_CAREER_IMAGE = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80';

export const getCareerImage = (key, title = '') => {
    // If key is a full URL, return it
    if (key && (key.startsWith('http') || key.startsWith('data:'))) {
        return key;
    }
    if (key && key.startsWith('/')) {
        const base = import.meta.env.BASE_URL.replace(/\/$/, '');
        return `${base}${key}`;
    }

    const searchStr = `${key || ''} ${title || ''}`.toLowerCase().trim().replace(/\s+/g, '_');

    // Check direct matches in catalog
    if (key) {
        const normalizedKey = key.toString().toLowerCase().trim().replace(/\s+/g, '_');
        if (careerImages[normalizedKey]) {
            return `${careerImages[normalizedKey]}?auto=format&fit=crop&w=1200&q=80`;
        }
    }

    // Keyword based fallbacks
    if (searchStr.includes('software') || searchStr.includes('engineer') || searchStr.includes('developer') || searchStr.includes('code') || searchStr.includes('backend') || searchStr.includes('frontend')) {
        return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';
    }
    if (searchStr.includes('data') || searchStr.includes('analyst') || searchStr.includes('stat') || searchStr.includes('math') || searchStr.includes('science')) {
        return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
    }
    if (searchStr.includes('market') || searchStr.includes('seo') || searchStr.includes('ads') || searchStr.includes('business') || searchStr.includes('social')) {
        return 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80';
    }
    if (searchStr.includes('design') || searchStr.includes('ui') || searchStr.includes('ux') || searchStr.includes('creative') || searchStr.includes('graphic') || searchStr.includes('motion')) {
        return 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80';
    }

    return DEFAULT_CAREER_IMAGE;
};


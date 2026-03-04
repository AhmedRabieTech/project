import initialCareers from '../data/careers.json';

const CAREER_PATHS_KEY = 'career_paths_data';

export const getCareerPaths = () => {
    const localData = localStorage.getItem(CAREER_PATHS_KEY);
    const existingPaths = localData ? JSON.parse(localData) : [];

    // Ensure all initial careers from JSON are present
    const existingIds = new Set(existingPaths.map(p => p.id));
    const mergedPaths = [...existingPaths];

    initialCareers.forEach(career => {
        if (!existingIds.has(career.id)) {
            mergedPaths.push(career);
        }
    });

    if (!localData || mergedPaths.length > existingPaths.length) {
        localStorage.setItem(CAREER_PATHS_KEY, JSON.stringify(mergedPaths));
    }

    return mergedPaths;
};

export const saveCareerPath = (path) => {
    const paths = getCareerPaths();
    const newPath = {
        ...path,
        id: path.id || Date.now().toString(),
        createdAt: new Date().toISOString()
    };
    paths.push(newPath);
    localStorage.setItem(CAREER_PATHS_KEY, JSON.stringify(paths));
    return newPath;
};

export const updateCareerPath = (id, updatedPath) => {
    const paths = getCareerPaths();
    const index = paths.findIndex(p => p.id === id);
    if (index !== -1) {
        paths[index] = { ...paths[index], ...updatedPath };
        localStorage.setItem(CAREER_PATHS_KEY, JSON.stringify(paths));
        return true;
    }
    return false;
};

export const deleteCareerPath = (id) => {
    const paths = getCareerPaths();
    const filtered = paths.filter(p => p.id !== id);
    localStorage.setItem(CAREER_PATHS_KEY, JSON.stringify(filtered));
};


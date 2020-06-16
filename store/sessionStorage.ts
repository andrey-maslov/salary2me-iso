export const loadState = (name) => {
    try {
        const serializedState = sessionStorage.getItem(name);

        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
};

export const saveState = (name, state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem(name, serializedState);
    } catch (error) {
        // Ignore write errors.
    }
};
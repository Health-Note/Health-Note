import { useState } from 'react'

function useToggle (initialValue = false) {
    const [state, setState] = useState(initialValue);
    const Toggle = () => {
        setState(!state);
    }
    return [state, Toggle];
}

export default useToggle;
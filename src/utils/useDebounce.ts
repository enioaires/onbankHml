import { useState } from 'react';

const useDebounce = () => {
    const [timeout, setTimeout] = useState();
};

export default useDebounce;

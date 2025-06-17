import { useState } from "react"

type InputState = { [key: string]: string };
type ErrorState = { [key: string]: string };

const useInputText = () => {

    const [input, setInput] = useState<InputState>()
    const [error, setError] = useState<ErrorState>()
    const [isChecked, setChecked] = useState(false);

    const handleTextChange = (field: string, text: string) => setInput(preState => ({ ...preState, [field]: text }))
    const handleErrorChange = (field: string, message: string) => setError(preState => ({ ...preState, [field]: message }))

    return { handleTextChange, handleErrorChange, input, error, setChecked, isChecked, setInput }
}

export default useInputText
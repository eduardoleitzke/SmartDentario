import React, {useState, createContext} from "react";


export const DataContext = createContext()

export function DataProvider(props){
    const [telValue, setTelValue] = useState("")
    const [errorMessageValue, setErrorMessageValue] = useState(null)
    const [componentValue,setComponentValue] = useState(false)
    const [showHide, setShowHide] = useState(false)
    const [idValue, setIdValue] = useState('')
return(
    <DataContext.Provider value={{show:[showHide, setShowHide], id:[idValue, setIdValue],  tel: [telValue, setTelValue], errorMessage: [errorMessageValue, setErrorMessageValue], component:[componentValue,setComponentValue]}}>
        {props.children}
    </DataContext.Provider>
)   

}
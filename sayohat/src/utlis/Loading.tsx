import { Oval } from "react-loader-spinner";
import './loading.css'
function Loading() {
    return (
        <>
            <Oval
                visible={true}
                height='30'
                width='30'
                color= "#252525"
                ariaLabel = "oval-loading"
                wrapperClass = 'loader'
            />
        </>
    )
}
export default Loading
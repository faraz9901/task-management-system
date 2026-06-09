import { Spinner } from "./ui/spinner"

function FullScreenLoader() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner className="h-10 w-10" />
        </div>
    )
}

export default FullScreenLoader
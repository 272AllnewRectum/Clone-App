interface ModalProps {
    open: boolean
    onClose?: () => void
    children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({open, onClose, children}) => {
    return (
        <div className={`fixed inset-0 flex flex-col justify-center items-center transition colors z-20 ${open? "visible bg-[#020717]/90" : "invisible"}`}
        onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
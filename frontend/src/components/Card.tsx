import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
    card: any;
}

export const Card: React.FC<CardProps> = ({
    card,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
    const style ={
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 text-sm cursor-pointer hover:bg-gray-50 transition-colors">
            {card.title}
        </div>
    )
}
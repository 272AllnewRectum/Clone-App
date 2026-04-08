import { Board } from "../components/Board"

const mockData = {
  id: "board-1",
  title: "Create Cloning App",
  lists: [
    {
      id: "list-1",
      name: "name1",
      cards: [
        {
          id: "id-1-1",
          title: "card-1-1",
          description: "description-1-1",
        },
        {
          id: "id-1-2",
          title: "card-1-2",
          description: "description-1-2",
        },
      ],
    },
    {
      id: "list-2",
      name: "name2",
      cards: [
        {
          id: "id-2-1",
          title: "card-2-1",
          description: "description-2-1",
        },
      ],
    },
    {
      id: "list-3",
      name: "name3",
      cards: [],
    },
  ],
};

export function BoardPage() {
    return (
        <div className="h-screen w-full font-inter text-black overflow-hidden flex flex-col">
            <nav className="border shadow-[5.5px_6px_0_#000] rounded-xl p-5 font-bold text-xl mb-5">
                Cloning App
            </nav>
            <div className="flex-1 overflow-x-auto">
                <Board data={mockData}></Board>
            </div>
            
        </div>
    )
}
import { act, useState } from "react";
import { Card } from "./Card";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Modal } from "./Modal";
import { InputField } from "./InputField";
import { Button } from "./Button";

interface BoardProps {
  data: any;
}

export const Board: React.FC<BoardProps> = ({ data }) => {
  const [newdata, setNewData] = useState(data);
  const [open, setOpen] = useState<boolean>(false);
  const [listinput, setListInput] = useState("");
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [cardInput, setCardInput] = useState("");

  const addList = () => {
    if (listinput === "") return;
    if (!open) return;
    let randomId = (Math.random() * 10).toString();
    const newList = {
      id: randomId,
      name: listinput,
      cards: [],
    };
    setNewData({ ...newdata, lists: [...newdata.lists, newList] });
  };

  const addCard = (targetListId: any) => {
    if (cardInput === "") return;
    let randomId = (Math.random() * 10).toString();
    const newCard = {
      listId: targetListId,
      id: randomId,
      title: cardInput,
      description: "LOL",
    };
    const updatedLists = newdata.lists.map((list: any) => {
      if (list.id === targetListId) {
        return {
          ...list,
          cards: [...list.cards, newCard],
        };
      } else {
        return list;
      }
    });
    setNewData({ ...newdata, lists: updatedLists });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log("move card", active.id, "to card", over?.id);
    if (!over) return;
    if (active.id === over.id) return;

    const activeList = newdata.lists.find((list: any) => {
      const cardID = list.cards.some((card: any) => {
        if (card.id === active.id) {
          return card.id;
        }
      });
      return cardID;
    });
    console.log("activeList:", activeList?.name);

    const overList = newdata.lists.find((list: any) => {
      const cardID = list.cards.some((card: any) => {
        if (card.id === over.id) {
          return card.id;
        }
      });
      return cardID;
    });
    console.log("overList:", overList?.name);

    if (!activeList || !overList) return;
    if (activeList.id === overList.id) {
      const oldIndex = activeList.cards.findIndex((card: any) => {
        if (card.id === active.id) {
          return card.id;
        }
      });
      console.log(oldIndex);
      const newIndex = activeList.cards.findIndex((card: any) => {
        if (card.id === over.id) {
          return card.id;
        }
      });
      console.log(newIndex);
      const updatedCards = arrayMove(activeList.cards, oldIndex, newIndex);
      const updatedLists = newdata.lists.map((list: any) => {
        if (list.id === activeList.id) {
          return {
            ...list,
            cards: updatedCards,
          };
        } else {
          return list;
        }
      });
      console.log(updatedLists);
      setNewData({ ...newdata, lists: updatedLists });
    } else {
      console.log("move", activeList.name, "to", overList.name);
      const activeCard = activeList.cards.find((card: any) => {
        if (card.id === active.id) {
          return card.id;
        }
      });
      console.log("activeCard", activeCard);
      const newIndex = overList.cards.findIndex((card: any) => {
        if (card.id === over.id) return card.id;
      });
      console.log("newIndex", newIndex);
      const updatedLists = newdata.lists.map((list: any) => {
        if (list.id === activeList.id) {
          return {
            ...list,
            cards: list.cards.filter((card: any) => card.id !== active.id),
          };
        }
        if (list.id === overList.id) {
          return {
            ...list,
            cards: list.cards.toSpliced(newIndex, 0, activeCard),
          };
        } else {
          return list;
        }
      });
      setNewData({ ...newdata, lists: updatedLists });
    }
  };

  return (
    <div className="p-6 h-full flex flex-col font-inter">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col justify-center text-center font-inter min-h-[65vh] min-w-[50vh] ">
          <div className="border border-black/10 bg-white shadow-[5.5px_6px_0_#000] rounded-4xl p-4">
            <div className="flex w-full justify-end h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <span className="font-inter font-bold text-lg">New List Topic</span>

            <div className="flex flex-col justify-center items-center mt-4 gap-4 pb-5">
              <InputField
                label="Topic"
                title="Enter Topic"
                type="text"
                value={listinput}
                onChange={(e) => setListInput(e.target.value)}
              ></InputField>
              <Button
                text="SUBMIT"
                onClick={() => {
                  (addList(), setOpen(false));
                }}
              ></Button>
            </div>
          </div>
        </div>
      </Modal>
      <h1 className="text-lg font-bold mb-6">{newdata.title}</h1>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 items-start">
          {newdata.lists.map((list: any) => (
            <div
              key={list.id}
              className="bg-[#f1f2f4] p-3 rounded-xl w-[280px] shrink-0 text-black shadow-sm"
            >
              <h2 className="font-bold text-sm mb-3 px-1">{list.name}</h2>
              <div className="flex flex-col gap-2">
                <SortableContext
                  items={list.cards.map((c: any) => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {list.cards.map((card: any) => (
                    <Card key={card.id} card={card}></Card>
                  ))}
                </SortableContext>
              </div>
              <div
                className="flex-1 w-full mt-3 text-left text-sm text-gray-500 cursor-pointer"
                onClick={() => setActiveListId(list.id)}
              >
                {activeListId === list.id && (
                  <div className="flex justify-center items-center ">
                    <input
                      placeholder="Enter your card name"
                      value={cardInput}
                      onChange={(e) => setCardInput(e.target.value)}
                      className="w-full px-2 py-1.5 text-sm text-gray-500 outline-none hover:bg-gray-200 rounded-md transition-colors"
                    ></input>
                    <div>
                      <span
                        className="font-bold px-2 py-1.5 cursor-pointer hover:bg-gray-200 rounded-md transition-colors"
                        onClick={(e) => {
                          (e.stopPropagation(),
                            addCard(list.id),
                            setCardInput(""),
                            setActiveListId(null));
                        }}
                      >
                        ADD
                      </span>
                    </div>
                    <div className="flex h-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        onClick={(e) => {
                          (e.stopPropagation(),
                            setCardInput(""),
                            setActiveListId(null));
                        }}
                        className="cursor-pointer hover:bg-gray-200 rounded-md transition-colors"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                {!(activeListId === list.id) && (
                  <div className="px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-200 rounded-md transition-colors">
                    <span>+ Add a card</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            className="bg-white/20 hover:bg-white/30 text-black w-[280px] shrink-0 p-3 rounded-xl font-bold text-sm text-left transition-colors cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            + Add another list
          </button>
        </div>
      </DndContext>
    </div>
  );
};

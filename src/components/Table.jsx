import React, { useState } from "react";
import TimeBox from "./TimeBox";
import { AiTwotoneDelete } from "react-icons/ai";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "./Header";

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "grey" : "",
  ...draggableStyle,
});

const Table = () => {
  const [timezone, setTimezone] = useState([]);
  const [global, setGlobal] = useState(0);
  const [tada, setTada] = useState([]);
  const [theme, setTheme] = useState("light");



  // const data = timezones;

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items2 = Array.from(tada);
    console.log(items2)

    console.log(result.source)
    console.log(result.destination)

    const [reorderedItem2] = items2.splice(result.source.index, 1);
    items2.splice(result.destination.index, 0, reorderedItem2);
    setTada(items2);

    const items = Array.from(tada.map((item) => item.timezone));
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTimezone(items);
  };
  const changeOrder = () => {
    const keys = Object.keys(tada);
    const reversed = keys.slice().reverse(); // Make a copy of keys and reverse the copy
    const item = reversed.map((i) => tada[i]);

    const keys1 = Object.keys(timezone);
    const reversed1 = keys1.slice().reverse(); // Make a copy of keys1 and reverse the copy
    const item1 = reversed1.map((i) => timezone[i]);

    setTada(item);
    setTimezone(item1);
};


  return (
    <>
      <div className={`flex h-fit flex-col p-6 justify-center items-center`}>
        <Header
          timezone={timezone}
          setTimezone={setTimezone}
          tada={tada}
          setTada={setTada}
          theme={theme}
          setTheme={setTheme}
          changeOrder={changeOrder}
        />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {tada.length > 0 && (
            <div className="w-full mt-2 bg-slate-500 border-sm rounded text-black">
              <Droppable droppableId="datas" direction="vertical" type="column">
                {(provided) => (
                  <ul
                    className="datas"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tada.map((item, index) => {
                      return (
                        <Draggable
                          key={item.timezone}
                          draggableId={item.timezone}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <li
                              className={`relative  p-4 border datas bg-light-gray text-black border-gray-400 hover:border-blue-500 hover:border-2
                                ${theme === "dark"
                                  ? "bg-gray-700 text-white"
                                  : "bg-white text-black"
                                }`
                              }
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div className="relative">
                                <div
                                  className="dots-button absolute w-fit h-20 flex"
                                // {...provided.dragHandleProps}
                                >

                                </div>
                                <div className="ml-8">
                                  <h1 className="font-bold text-3xl">
                                    {item.city}
                                  </h1>
                                  <h3 className="font-light text-sm">
                                    {item.timezone}
                                  </h3>
                                  <div className="my-5">
                                    <TimeBox
                                      zone={item}
                                      global={global}
                                      setGlobal={setGlobal}
                                      tada={tada}
                                      setTada={setTada}
                                    />
                                  </div>
                                  <AiTwotoneDelete
                                    className="text-red-500 cursor-pointer absolute top-2 right-2 text-2xl"
                                    onClick={(e) => {
                                      const items = tada.filter(
                                        (i) => i.timezone !== item.timezone
                                      );
                                      const items2 = timezone.filter(
                                        (i1) => i1.timezone !== item.timezone
                                      );
                                      setTada(items);
                                      setTimezone(items2);
                                    }}
                                  />
                                </div>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          )}
        </DragDropContext>
      </div>
    </>
  );
};

export default Table;
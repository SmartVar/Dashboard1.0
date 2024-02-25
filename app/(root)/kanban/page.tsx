/* eslint-disable prefer-const */
/* eslint-disable camelcase */
// @ts-ignore

"use client"
import React, { useEffect, useState } from "react";
// import Board from "../Components/Board/Board";
import Board from "../../../components/kanban/Board/Board";
import Editable from "../../../components/kanban/Editabled/Editable";
// import styles from "./App.module.css";
import styles from "../../../components/kanban/App.module.css";

interface Card {
  id: string;
  title: string;
  labels: string[];
  date: string;
  tasks: any[];
}

// eslint-disable-next-line no-redeclare

// eslint-disable-next-line no-redeclare
interface Board {
  id: string;
  title: string;
  cards: Card[];
}

const Page: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>(
    // @ts-ignore
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );

  const [targetCard, setTargetCard] = useState<{ bid: string; cid: string }>({
    bid: "",
    cid: "",
  });

  const addboardHandler = (name: string) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2 + "",
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };

  const removeBoard = (id: string) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  const addCardHandler = (id: string, title: string) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2 + "",
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid: string, cid: string) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid: string, cid: string) => {
    // eslint-disable-next-line camelcase
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    // eslint-disable-next-line camelcase
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid: string, cid: string) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid: string, cid: string, card: Card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    // <div className = "text-dark700_light700  border-none bg-light-900  focus:bg-light-800 dark:bg-dark-300  dark:focus:bg-dark-400">
    
    <div className={styles.app}>
      <div className="h1-bold text-dark100_light900">
        <h1>Kanban Board</h1>
      </div>
      <div className={styles.app_boards_container}>
        <div className={styles.app_boards}>
          {boards.map((item) => (
           
           
           <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              // @ts-ignore
              dragEnded={dragEnded}label
              // @ts-ignore
             dragEntered={dragEntered}
              updateCard={updateCard}
              
            />
            
          ))}
          <div className={styles.app_boards_last}>
            <Editable
              displayClass={styles.app_boards_addBoard}
              editClass={styles.app_boards_addBoard_edit}
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Page;

'use-client'
import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../../../components/kanban/Editabled/Editable";
import styles from "./Board.module.css";

interface BoardProps {
  board: {
    title: string;
    cards?: any[];
    id: string;
  };
  removeBoard: () => void;
  removeCard: (boardId: string, cardId: string) => void;
  dragEntered: (boardId: string) => void;
  dragEnded: () => void;
  updateCard: (boardId: string, cardId: string, updatedData: any) => void;
  addCard: (boardId: string, cardTitle: string) => void;
}

const Board: React.FC<BoardProps> = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={styles.board}>
      <div className={styles.board_header}>
        <p className={styles.board_header_title}>
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div
          className={styles.board_header_title_more}
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
            // @ts-ignore
              className={styles.board_dropdown}
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className={`${styles.board_cards} custom-scroll text-dark700_light700`}>
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass={styles.board_addCard}
          editClass={styles.board_addCard_edit}
          // @ts-ignore
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
};

export default Board;

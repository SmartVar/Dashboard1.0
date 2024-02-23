// @ts-ignore
'use-client'
import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "./CardInfo/CardInfo";
import styles from "./Card.module.css";

interface Label {
  text: string;
  color: string;
}

interface Task {
  text: string;
  completed: boolean;
}

interface CardProps {
  card: {
    id: string;
    title: string;
    date: string;
    tasks?: Task[];
    labels?: Label[];
  };
  boardId: string;
  dragEnded: (boardId: string, cardId: string) => void;
  dragEntered: (boardId: string, cardId: string) => void;
  removeCard: (boardId: string, cardId: string) => void;
  updateCard: (boardId: string, cardId: string, updatedData: any) => void;
}

const Card: React.FC<CardProps> = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, tasks, labels } = props.card;

  const formatDate = (value: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          // @ts-ignore
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className={styles.card}
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className={styles.card_top}>
          <div className={styles.card_top_labels}>
            {labels?.map((item, index) => (
              <label
                key={index}
                style={{ backgroundColor: item.color }}
              >
                {item.text}
              </label>
            ))}
          </div>
          <div
            className={styles.card_top_more}
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
              // @ts-ignore
                className={styles.board_dropdown}
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className={styles.card_title}>{title}</div>
        <div className={styles.card_footer}>
          {date && (
            <p className={styles.card_footer_item}>
              <Clock className={styles.card_footer_icon} />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className={styles.card_footer_item}>
              <CheckSquare className={styles.card_footer_icon} />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;

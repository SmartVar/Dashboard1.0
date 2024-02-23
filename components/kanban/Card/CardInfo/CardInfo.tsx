'use-client'
import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";

import Modal from "../../Modal/Modal";
import Editable from "../../../kanban/Editabled/Editable";

import styles from "./CardInfo.module.css";

interface Label {
  text: string;
  color: string;
}

interface Task {
  id: number;
  completed: boolean;
  text: string;
}

interface CardInfoProps {
  onClose: () => void;
  boardId: string;
  card: {
    id: string;
    title: string;
    desc?: string;
    date: string;
    labels: Label[];
    tasks: Task[];
  };
  updateCard?: (boardId: string, cardId: string, updatedData: any) => void;
}

const CardInfo: React.FC<CardInfoProps> = (props) => {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [selectedColor, setSelectedColor] = useState<string>();
  const [values, setValues] = useState(props.card);

  const updateTitle = (value: string) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value: string) => {
    setValues({ ...values, desc: value });
  };

  const addLabel = (label: Label) => {
    const index = values.labels.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setSelectedColor("");
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
  };

  const removeLabel = (label: Label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  const addTask = (value: string) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setValues({
      ...values,
      tasks: [...values.tasks, task],
    });
  };

  const removeTask = (id: number) => {
    const tasks = [...values.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setValues({
      ...values,
      tasks: tempTasks,
    });
  };

  const updateTask = (id: number, value: boolean) => {
    const tasks = [...values.tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = value;

    setValues({
      ...values,
      tasks,
    });
  };

  const calculatePercent = () => {
    if (!values.tasks?.length) return 0;
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100;
  };

  const updateDate = (date: string) => {
    if (!date) return;

    setValues({
      ...values,
      date,
    });
  };

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.boardId, values.id, values);
  }, [values]);

  return (
    <Modal onClose={props.onClose}>
      <div className={styles.cardinfo}>
        <div className={styles.cardinfo_box}>
          <div className={styles.cardinfo_box_title}>
            <Type />
            <p>Title</p>
          </div>
          <Editable
            defaultValue={values.title}
            text={values.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className={styles.cardinfo_box}>
          <div className={styles.cardinfo_box_title}>
            <List />
            <p>Description</p>
          </div>
          <Editable
            defaultValue={values.desc}
            text={values.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </div>

        <div className={styles.cardinfo_box}>
          <div className={styles.cardinfo_box_title}>
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={values.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>

        <div className={styles.cardinfo_box}>
          <div className={styles.cardinfo_box_title}>
            <Tag />
            <p>Labels</p>
          </div>
          <div className={styles.cardinfo_box_labels}>
            {values.labels?.map((item, index) => (
              <label
                key={index}
                style={{ backgroundColor: item.color, color: "#fff" }}
              >
                {item.text}
                <X onClick={() => removeLabel(item)} />
              </label>
            ))}
          </div>
          <ul>
            {colors.map((item, index) => (
              <li
                key={index + item}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? styles.li_active : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <Editable
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value: any) =>
              addLabel({ color: selectedColor || "", text: value })
            }
          />
        </div>

        <div className={styles.cardinfo_box}>
          <div className={styles.cardinfo_box_title}>
            <CheckSquare />
            <p>Tasks</p>
          </div>
          <div className={styles.cardinfo_box_progress_bar}>
            <div
              className={styles.cardinfo_box_progress}
              style={{
                width: `${calculatePercent()}%`,
                backgroundColor:
                  calculatePercent() === 100 ? "limegreen" : "",
              }}
            />
          </div>
          <div className={styles.cardinfo_box_task_list}>
            {values.tasks?.map((item) => (
              <div
                key={item.id}
                className={styles.cardinfo_box_task_checkbox}
              >
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? styles.completed : ""}>
                  {item.text}
                </p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <Editable
            text={"Add a Task"}
            placeholder="Enter task"
            onSubmit={addTask}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CardInfo;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useUpdateUserTopicsMutation,
  useGetMeQuery,
} from "./accountSlice";
import "./account.css";

/**
 *
 * @component ChooseTopics shows a list categories and category topics. The logged in user can pick 3 topics from the categories as their favorites topics to play on quiz on.
 */
export default function ChooseTopics() {
  const { data: categories } = useGetCategoriesQuery();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [updateUserTopics] = useUpdateUserTopicsMutation();
  const { data: me } = useGetMeQuery();
  const id = me?.id;

  /**
   *
   * @description handleCheckChange allows the user to only choose 3 topics from the list of topics.
   */
  const handleCheckChange = (topicId, isChecked) => {
    if (isChecked) {
      if (selectedTopics.length < 3) {
        setSelectedTopics([...selectedTopics, topicId]);
      } else {
        alert("You can only choose 3 topics");
      }
    } else {
      setSelectedTopics((prevSelected) =>
        prevSelected.filter((id) => id !== topicId)
      );
    }
  };

  /**
   *
   * @description handleSubmit updates the logged in users topics via the useUpdateUserTopicsMutation by way of the handleCheckChange topics chosen.
   */
  const handleSumbit = async () => {
    try {
      await updateUserTopics({ id, topicIds: selectedTopics }).unwrap();
    } catch (error) {
      console.error("Failed to update user topics:", error);
    }
  };

  /**
   *
   * @function CategoryItem
   * @param {Object} param0
   * @param {*} param0.category
   * @param {*} param0.onCheckboxChange
   * @param {*} param0.selectedTopics
   * @returns the category from the database and it's corresponding topics for the logged in user to pick from.
   */
  function CategoryItem({ category, onCheckboxChange, selectedTopics }) {
    return (
      <section className="categoryItemSection">
        <h2 id="categoryName">{category.name}</h2>
        <ul id="checkBoxContainer">
          {category.Category_topics.map(({ topic }) => (
            <li key={topic.id}>
              <label id="topicsNames">
                {topic.name}
                <input
                  id="checkbox"
                  type="checkbox"
                  value={topic.id}
                  checked={selectedTopics.includes(topic.id)}
                  onChange={(e) => onCheckboxChange(topic.id, e.target.checked)}
                />
              </label>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <article className="chooseTopicsPage">
      <h1 id="chooseTopicsHeadline">Favorite Quiz Topics:</h1>
      <p id="chooseTopicsTag">Pick 3</p>
      <div className="categoryItemContainer">
        {categories?.map((category) => (
          <CategoryItem
            id="categoryCard"
            key={category.id}
            category={category}
            onCheckboxChange={handleCheckChange}
            selectedTopics={selectedTopics}
          />
        ))}
      </div>
      <div id="buttonSection">
        <button id="submitTopicsButton" onClick={handleSumbit}>
          <Link to={`/account/`}>Submit Topics</Link>
        </button>
      </div>
    </article>
  );
}

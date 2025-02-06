import { useEffect, useState } from "react";
import styles from "./CategoriesPage.module.css";
import { useRouter } from "next/router";
import Card from "../modules/Card";

function CategoriesPage({ data }) {
  const router = useRouter();

  const [query, setQuery] = useState({ difficulty: "", time: "" });

  useEffect(() => {
    const { difficulty, time } = router.query;

    if (query.difficulty !== difficulty || query.time !== time) {
      setQuery({ difficulty, time });
    }
  }, []);

  const changeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setQuery((prevQuery) => ({ ...prevQuery, [name]: value }));
  };

  const searchHandler = () => {
    if (!query.difficulty || !query.time) {
      router.push(`/categories`);
    }
    router.push({
      pathname: "/categories",
      query,
    });
  };

  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <div className={styles.subContainer}>
        <div className={styles.select}>
          <select
            value={query.difficulty}
            name="difficulty"
            onChange={changeHandler}
          >
            <option value="">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select value={query.time} name="time" onChange={changeHandler}>
            <option value="">Cooking Time</option>
            <option value="more">More than 30 min</option>
            <option value="less">Less than 30 min</option>
          </select>
          <button onClick={searchHandler}>Search</button>

          <div className={styles.cards}>
            {" "}
            {!data.length ? (
              <img src="/images/search.png" alt="Category" />
            ) : null}
            {data.map((food) => (
              <Card key={food.id} {...food} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;

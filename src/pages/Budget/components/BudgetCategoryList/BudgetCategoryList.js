import React from "react";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import { ToggleList } from "components";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";
function BudgetCategoryList({ budgetedCategories, allCategories, state }) {
  const budgetedCategoriesByParent = groupBy(
    budgetedCategories,
    (item) =>
      allCategories.find((category) => category.id === item.categoryId)
        .parentCategory.name
  );
  console.log(budgetedCategories);
  console.log(budgetedCategoriesByParent);
  const listItems = Object.entries(budgetedCategoriesByParent).map(
    ([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory name={parentName} onClick={() => onClick(parentName)} />
      ),
      children: categories.map((budgetedCategory) => {
        const { name } = allCategories.find(
          (category) => category.id === budgetedCategory.categoryId
        );
        return <CategoryItem key={budgetedCategory.id} name={name} />;
      }),
    })
  );
  console.log(listItems);
  return (
    <div>
      <ToggleList items={listItems} />
    </div>
  );
}

export default connect((state) => ({
  budgetedCategories: state.budget.budgetCategories,
  allCategories: state.common.allCategories,
}))(BudgetCategoryList);

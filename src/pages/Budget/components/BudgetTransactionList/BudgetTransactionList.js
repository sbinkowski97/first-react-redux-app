import React, { useMemo } from "react";
import { List, ListItem } from "./BudgetTransactionList.css";
import { groupBy } from "lodash";
import { connect } from "react-redux";
import { formatCurrency, formatDate } from "utils";
function BudgetTransactionList({
  transactions,
  allCategories,
  selectedParentCategoryId,
  budgetedCategories,
}) {
  const filteredTransactionsBySelectedParentCategory = useMemo(() => {
    if (typeof selectedParentCategoryId === "undefined") {
      return transactions;
    }
    if (selectedParentCategoryId === null) {
      return transactions.filter((transaction) => {
        const hasBudgetedCategory = budgetedCategories.some(
          (budgetedCategory) =>
            budgetedCategory.categoryId === transaction.categoryId
        );
        return !hasBudgetedCategory;
      });
    }
    return transactions.filter((transaction) => {
      try {
        const category = allCategories.find(
          (category) => category.id === transaction.categoryId
        );
        const parentCategoryName = category.parentCategory.name;
        return parentCategoryName === selectedParentCategoryId;
      } catch (error) {
        return false;
      }
    });
  }, [
    allCategories,
    budgetedCategories,
    selectedParentCategoryId,
    transactions,
  ]);

  const groupedTransactions = groupBy(
    filteredTransactionsBySelectedParentCategory,
    (transaction) => new Date(transaction.date).getUTCDate()
  );

  return (
    <List>
      {Object.entries(groupedTransactions).map(([key, transactions]) => (
        <li>
          <ul>
            {transactions.map((transaction) => (
              <ListItem>
                <div>{transaction.description}</div>
                <div>{formatCurrency(transaction.amount)}</div>
                <div>{formatDate(transaction.date)}</div>
                <div>
                  {
                    (
                      allCategories.find(
                        (category) => category.id === transaction.categoryId
                      ) || {}
                    ).name
                  }
                </div>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}
export default connect((state) => ({
  budgetedCategories: state.budget.budgetCategories,
  transactions: state.budget.budget.transactions,
  allCategories: state.common.allCategories,
  selectedParentCategoryId: state.budget.selectedParentCategoryId,
}))(BudgetTransactionList);

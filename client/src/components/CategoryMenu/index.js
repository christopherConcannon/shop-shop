import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
	// const { data: categoryData } = useQuery(QUERY_CATEGORIES);
	// const categories = categoryData?.categories || [];

  // when component mounts, use useContext wrapper function to retrieve current state and the dispatch method to update state (on load it's empty)
	const [ state, dispatch ] = useStoreContext();

  // destructure categories property from state
	const { categories } = state;

  // query category data to be stored in global state in useEffect hook
	const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // useEffect hook will run once categoryData is no longer undefined
	useEffect(
		() => {
			// if categoryData exists or has changed from the response of useQuery, then run dispatch()
			if (categoryData) {
				// execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
				dispatch({
					type       : UPDATE_CATEGORIES,
					categories : categoryData.categories
        });
        // also write to IndexedDB
        categoryData.categories.forEach(category => {
          idbPromise('categories', 'put', category);
        })
			} else if (!loading) {
        idbPromise('categories', 'get').then(categories => {
          dispatch({
            type: UPDATE_CATEGORIES,
            categories: categories
          })
        })
      }
		},
		[ categoryData, loading, dispatch ]
  );
  
  // update current category through global state rather than prop function
  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    })
  }

	return (
		<div>
			<h2>Choose a Category:</h2>
      {/* now categories data is coming from global state rather than directly from Apollo query */}
			{categories.map((item) => (
				<button
					key={item._id}
					onClick={() => {
						handleClick(item._id);
					}}
				>
					{item.name}
				</button>
			))}
		</div>
	);
}

export default CategoryMenu;

import axios from 'axios';

export const fetchData = () => async (dispatch) => {
    try {
        dispatch({ type: "dataRequest" });

        const response = await axios.get(
            "https://api.quicksell.co/v1/internal/frontend-assignment"
        );

        if (response.status === 200) {
            dispatch({ type: "dataSuccess", payload: response.data });
        } else {
            dispatch({ type: "dataFailure" });
        }
    } catch (error) {
        dispatch({ type: "dataFailure" });
    }
};

export const selectData = (groupBy, tickets, orderBy) => async (dispatch) => {
    try {
        dispatch({ type: 'dataSelectRequest' })

        let user = false;
        let mySet = new Set();
        let arr = [], dataSelected = [];

        if (groupBy === 'status') {
            tickets.forEach((elem) => {
                mySet.add(elem.status);
            })

            arr = [...mySet];

            arr.forEach((elem, index) => {
                let arr = tickets.filter((fElem) => {
                    return elem === fElem.status;
                })
                dataSelected.push({
                    [index]: {
                        title: elem,
                        value: arr
                    }
                })
            })
        } else if (groupBy === 'user') {
            user = true;
            tickets?.users?.forEach((elem, index) => {
                arr = tickets?.tickets?.filter((Felem) => {
                    return elem.id === Felem.userId;
                })

                dataSelected.push({
                    [index]: {
                        title: elem.name,
                        value: arr
                    }
                })
            })
        } else {
            let prior_list = ["Urgent", "High", "Medium", "Low", "No priority"];

            prior_list.forEach((elem, index) => {
                arr = tickets.filter((fElem) => {
                    return index === 4-fElem.priority;
                })

                dataSelected.push({
                    [index]: {
                        title: elem,
                        value: arr
                    }
                })
            })
        }

        if (orderBy === "title") {
            dataSelected.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => a.title.localeCompare(b.title))
            })
        }

        if (orderBy === "priority") {
            dataSelected.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => b.priority - a.priority)
            })
        }

        dispatch({ type: 'dataSelectSuccess', payload: { dataSelected, user } });

    } catch (error) {
        dispatch({ type: 'dataSelectFailure', payload: error.message })
    }
}




// temp

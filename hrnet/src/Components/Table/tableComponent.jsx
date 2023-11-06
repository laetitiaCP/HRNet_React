import "./tableComponent.scss";

function TableComponent({onChangeQuery, handleChangeNbRows, dataHeader, dataBody,nPages, currentPage, setCurrentPage}) {

    const handleChange = (e) => {
        let searchValue = e.target.value;
        onChangeQuery({search: searchValue});
    }

    const onChangeNbRows = (e) => {
        handleChangeNbRows(e.target.value);
    }

    return (
        <div className="table">
            <div>
                <input className="table__search" placeholder="Recherche" onChange={handleChange} />
                <label>
                    Voir
                    <select className="table__nbRows" name="selectRows" onChange={onChangeNbRows} defaultValue={10}>
                        <option value="5">5</option>
                        <option value="10" >10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    lignes
                </label>
            </div>
            <table className="data">
                <thead>
                <tr>{dataHeader()}</tr>
                </thead>
                <tbody>
                {dataBody()}
                </tbody>
            </table>
            <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

function Pagination({nPages, currentPage, setCurrentPage}) {
    let pageNumbers;
    if (nPages){
        pageNumbers = [...Array(nPages + 1 ).keys()].slice(1);
    }


    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (pageNumbers) {
        return (
            <nav>
                <ul className="pagination">
                    <li className="pagination__item">
                        <a className="pagination__link" onClick={prevPage}>
                            Précédent
                        </a>
                    </li>
                    {pageNumbers.map(pgNumber => (
                        <li key={pgNumber} className={`pagination__item ${currentPage === pgNumber ? "active" : ""}`}>
                            <a onClick={() => setCurrentPage(pgNumber)} className="pagination__link">
                                {pgNumber}
                            </a>
                        </li>
                    ))}
                    <li className="pagination__item">
                        <a className="pagination__link" onClick={nextPage}>
                            Suivant
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }

}

export default TableComponent;
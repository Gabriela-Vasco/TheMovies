import "../../../styles/main.scss"

export default function ContentCard({Title, Year, Rating, Image}){
    
    return (
        <div className="content-card">
                    <img className="content-card__img" src={Image}/> 
                    <div className="content-card__star">
                        <span className="content-card__rating">{Rating}</span>
                    </div>
                    <div className="content-card__info">
                        <div className="content-card__year">
                            <h3 className="content-card__title">{Title}</h3>
                            <span className="content-card__span">{Year}</span>
                        </div>
                    </div>
                </div>   
    )
}
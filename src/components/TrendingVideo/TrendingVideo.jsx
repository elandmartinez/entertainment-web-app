import "../../styles/TrendingVideo.css";
import Icon from "../Icon/index.js";
import { useDispatch } from "react-redux";
import { videosActions } from "../../store/videos-slice";

const TrendingVideo = ({ videoData }) => {
    const dispatch = useDispatch();
    const handleBookmarkClick = (e) => {
        dispatch(videosActions.toggleBookmark(videoData));
    }

    return (
        <article
            className="trending-video"
            style={{backgroundImage: `url(${videoData.thumbnail.trending.small})`}}
            key={videoData.id}
        >
            <div className="trending-video__info">
                <p className="trending-video__year">{videoData.year}</p>
                <ul className="trending-video__specs">
                    <li className="trending-video__spec">
                        <Icon
                            name={false ? "tVCategoryIcon" : "movieCategoryIcon" }
                            className="trending-video__category-icon"
                        />
                        {videoData.category}
                    </li>
                    <li className="trending-video__spec" >
                        {videoData.rating}
                    </li>
                </ul>
            </div>
            <div
                className="video__bookmark-icon-cont"
                onClick={handleBookmarkClick}
            >
                <Icon
                    name={videoData.isBookmarked ? "fullBookmarkIcon" : "emptyBookmarkIcon"}
                    className="video__bookmark-icon"
                />
            </div>
            <p className="trending-video__title" >{videoData.title}</p>
            <div className="trending-video__overlay"></div>
            <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                target="_blank"
                rel="noreferrer"
                className="trending-video__play-cont"
            >
                <Icon name="playIcon" className="trending-video__play-icon" />
                <p>Play</p>
            </a>
        </article>
    )
}

export default TrendingVideo;
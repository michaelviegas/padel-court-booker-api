import axios from 'axios';
import utils from '../utils.js';

const clubId = 47410; // alsakia
const courtId = 6354; // campo 2
const hour = "19";
const min = "00";

async function relax(req, res, next) {
    const token = req.query.token;
    const bookingDate = utils.getNextDayOfTheWeek("monday");
    const playerIdsCsv = "210797,180022,210556";
    await bookCourt(res, next, token, bookingDate, playerIdsCsv);
}

async function marisco(req, res, next) {
    const token = req.query.token;
    const bookingDate1 = utils.getNextDayOfTheWeek("tuesday");
    const bookingDate2 = utils.getNextDayOfTheWeek("thursday");
    const bookingDate = bookingDate1 < bookingDate2 ? bookingDate1 : bookingDate2;

    const playerIdsCsv = "179439,180022,173264";
    await bookCourt(res, next, token, bookingDate, playerIdsCsv);
}

function bookCourt(res, next, token, bookingDate, playerIdsCsv) {
    const method = "get";
    const url = `https://api.tiesports.com/set_a_match.asmx/save_match_v7?token=${token}&club_id=${clubId}&sport_id=2&day=${utils.formatDate(bookingDate)}&hours=${hour}:${min}&duration_minutes=90&court_id=${courtId}&gender=3&min_rating=10&max_rating=320&min_age=5&max_age=99&list_players_ids=${playerIdsCsv}&singles=false&get_players_from_friends=false&get_players_from_club=false&get_players_from_last_matches=false&get_players_from_near=false&chat_room_ids=&chat_room_request_players=false&max_players=4&go_booking=true&booking_with_lighting=false&is_public=false&promoted_match_guid=&match_title=`;
    const headers = {
        "Host": "api.tiesports.com",
        "user-agent": "TiePlayer/196 CFNetwork/1335.0.3 Darwin/21.6.0",
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9"
    };
    return axios({ method, url, headers })
        .then(r => {
            const statusCode = r.data?.status ? 200 : 400;
            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(r.data));
        }).catch(next);
}

export default {
    relax,
    marisco
}
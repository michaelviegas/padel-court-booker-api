import axios from 'axios';
import utils from '../utils.js';

const clubId = 47410; // alsakia
const hour = "19";
const min = "00";

const courts = [
    6354, // campo 2
    6353, // campo 1
    6355 // campo 3
];

const players = {
    180022: "Hugo Martins",
    173264: "Darcy Mendes",
    179439: "Mário Clara",
    210556: "Mario Casinhas",
    210797: "Jose Carlos Viegas",
    118546: "Joao Ramos",
    177693: "João Duarte",
    200771: "Bruno Da Silva",
    183187: "José Miguel Manhoso",
    186340: "Luís Cristo",
    180408: "Monia Bernardo",
    177782: "Renato Coelho",
    90787: "Sónia Cristina Palma",
    177730: "Telmo Manuel Machado Pinto"
};

async function relax(req, res) {
    const token = req.query.token;
    const day = req.query.day;
    const bookingDate = utils.getNextDayOfTheWeek(day);
    const playerIdsCsv = "210797,180022,210556";
    await makeBooking(res, token, bookingDate, playerIdsCsv);
}

async function marisco(req, res) {
    const token = req.query.token;
    const day = req.query.day;
    const bookingDate = utils.getNextDayOfTheWeek(day);
    const playerIdsCsv = "179439,180022,173264";
    await makeBooking(res, token, bookingDate, playerIdsCsv);
}

async function makeBooking(res, token, bookingDate, playerIdsCsv) {
    for (const courtId of courts) {
        const r = await bookCourt(token, bookingDate, playerIdsCsv, courtId).catch(() => {});
        if (!r.data?.status) continue;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(r.data));
        return;
    }
    res.status(400).end("Something went wrong!");
}

function bookCourt(token, bookingDate, playerIdsCsv, courtId) {
    const method = "get";
    const url = `https://api.tiesports.com/set_a_match.asmx/save_match_v7?token=${token}&club_id=${clubId}&sport_id=2&day=${utils.formatDate(bookingDate)}&hours=${hour}:${min}&duration_minutes=90&court_id=${courtId}&gender=3&min_rating=10&max_rating=320&min_age=5&max_age=99&list_players_ids=${playerIdsCsv}&singles=false&get_players_from_friends=false&get_players_from_club=false&get_players_from_last_matches=false&get_players_from_near=false&chat_room_ids=&chat_room_request_players=false&max_players=4&go_booking=true&booking_with_lighting=false&is_public=false&promoted_match_guid=&match_title=`;
    const headers = {
        "Host": "api.tiesports.com",
        "user-agent": "TiePlayer/196 CFNetwork/1335.0.3 Darwin/21.6.0",
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9"
    };
    return axios({ method, url, headers });
}

export default {
    relax,
    marisco
}

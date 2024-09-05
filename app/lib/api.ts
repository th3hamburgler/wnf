import { FootballData, Player, Match, RawPlayerData, ProcessedPlayer } from './types'

const rawData: RawPlayerData[] = [
  {
  "Player": "Lee Smith",
  "DOB": "",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "W",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "W",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "2",
  "Wins": "2",
  "Draws": "0",
  "Losses": "0",
  "Total points": "6",
  "Points per game": "3.00"
  },
  {
  "Player": "Sam Brown",
  "DOB": "09/11/1996",
  "01/05/2024": "",
  "08/05/2024": "W",
  "22/05/2024": "W",
  "29/05/2024": "W",
  "05/06/2024": "NC",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "W",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "5",
  "Wins": "4",
  "Draws": "0",
  "Losses": "0",
  "Total points": "12",
  "Points per game": "2.40"
  },
  {
  "Player": "Moha Bendali",
  "DOB": "22/03/1996",
  "01/05/2024": "D1",
  "08/05/2024": "",
  "22/05/2024": "W",
  "29/05/2024": "",
  "05/06/2024": "NC",
  "12/06/2024": "W",
  "19/06/2024": "W",
  "26/06/2024": "D1",
  "03/07/2024": "W",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "W",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "L",
  "28/08/2024": "W",
  "Games Played": "10",
  "Wins": "6",
  "Draws": "2",
  "Losses": "1",
  "Total points": "20",
  "Points per game": "2.00"
  },
  {
  "Player": "Joseph Freeman",
  "DOB": "01/02/1990",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "L",
  "29/05/2024": "W",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "W",
  "26/06/2024": "",
  "03/07/2024": "W",
  "10/07/2024": "W",
  "17/07/2024": "NC",
  "24/07/2024": "",
  "31/07/2024": "W",
  "07/08/2024": "L",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "W",
  "Games Played": "9",
  "Wins": "6",
  "Draws": "0",
  "Losses": "2",
  "Total points": "18",
  "Points per game": "2.00"
  },
  {
  "Player": "Dave Wraith",
  "DOB": "10/07/1985",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "L",
  "10/07/2024": "W",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "W",
  "Games Played": "3",
  "Wins": "2",
  "Draws": "0",
  "Losses": "1",
  "Total points": "6",
  "Points per game": "2.00"
  },
  {
  "Player": "Jim Wardlaw",
  "DOB": "28/06/1983",
  "01/05/2024": "D2",
  "08/05/2024": "W",
  "22/05/2024": "",
  "29/05/2024": "L",
  "05/06/2024": "NC",
  "12/06/2024": "L",
  "19/06/2024": "W",
  "26/06/2024": "D1",
  "03/07/2024": "W",
  "10/07/2024": "W",
  "17/07/2024": "NC",
  "24/07/2024": "W",
  "31/07/2024": "W",
  "07/08/2024": "W",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "W",
  "Games Played": "14",
  "Wins": "8",
  "Draws": "2",
  "Losses": "2",
  "Total points": "26",
  "Points per game": "1.86"
  },
  {
  "Player": "Doug Park",
  "DOB": "01/12/1977",
  "01/05/2024": "D2",
  "08/05/2024": "",
  "22/05/2024": "W",
  "29/05/2024": "",
  "05/06/2024": "NC",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "L",
  "10/07/2024": "L",
  "17/07/2024": "",
  "24/07/2024": "W",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "W",
  "21/08/2024": "W",
  "28/08/2024": "W",
  "Games Played": "9",
  "Wins": "5",
  "Draws": "1",
  "Losses": "2",
  "Total points": "16",
  "Points per game": "1.78"
  },
  {
  "Player": "Rich Potter",
  "DOB": "01/12/1985",
  "01/05/2024": "D2",
  "08/05/2024": "W",
  "22/05/2024": "W",
  "29/05/2024": "L",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "4",
  "Wins": "2",
  "Draws": "1",
  "Losses": "1",
  "Total points": "7",
  "Points per game": "1.75"
  },
  {
  "Player": "Tom Brown",
  "DOB": "14/03/2000",
  "01/05/2024": "D2",
  "08/05/2024": "W",
  "22/05/2024": "L",
  "29/05/2024": "W",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "4",
  "Wins": "2",
  "Draws": "1",
  "Losses": "1",
  "Total points": "7",
  "Points per game": "1.75"
  },
  {
  "Player": "Mike Nicholas",
  "DOB": "01/10/1988",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "W",
  "29/05/2024": "L",
  "05/06/2024": "",
  "12/06/2024": "W",
  "19/06/2024": "L",
  "26/06/2024": "",
  "03/07/2024": "W",
  "10/07/2024": "",
  "17/07/2024": "NC",
  "24/07/2024": "L",
  "31/07/2024": "W",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "8",
  "Wins": "4",
  "Draws": "0",
  "Losses": "3",
  "Total points": "12",
  "Points per game": "1.50"
  },
  {
  "Player": "Matt Thompson",
  "DOB": "01/05/1986",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "W",
  "05/06/2024": "",
  "12/06/2024": "DNP",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "2",
  "Wins": "1",
  "Draws": "0",
  "Losses": "0",
  "Total points": "3",
  "Points per game": "1.50"
  },
  {
  "Player": "Joe Gibson",
  "DOB": "01/11/1989",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "L",
  "07/08/2024": "W",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "2",
  "Wins": "1",
  "Draws": "0",
  "Losses": "1",
  "Total points": "3",
  "Points per game": "1.50"
  },
  {
  "Player": "Chris Stowell",
  "DOB": "01/02/1991",
  "01/05/2024": "",
  "08/05/2024": "W",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "NC",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "NC",
  "24/07/2024": "L",
  "31/07/2024": "W",
  "07/08/2024": "L",
  "14/08/2024": "W",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "7",
  "Wins": "3",
  "Draws": "0",
  "Losses": "2",
  "Total points": "9",
  "Points per game": "1.29"
  },
  {
  "Player": "Mike Anson",
  "DOB": "24/03/1983",
  "01/05/2024": "D2",
  "08/05/2024": "L",
  "22/05/2024": "",
  "29/05/2024": "L",
  "05/06/2024": "NC",
  "12/06/2024": "L",
  "19/06/2024": "L",
  "26/06/2024": "D2",
  "03/07/2024": "W",
  "10/07/2024": "W",
  "17/07/2024": "NC",
  "24/07/2024": "W",
  "31/07/2024": "L",
  "07/08/2024": "W",
  "14/08/2024": "L",
  "21/08/2024": "W",
  "28/08/2024": "L",
  "Games Played": "16",
  "Wins": "5",
  "Draws": "2",
  "Losses": "7",
  "Total points": "17",
  "Points per game": "1.06"
  },
  {
  "Player": "Ash Garnett",
  "DOB": "17/06/1992",
  "01/05/2024": "D1",
  "08/05/2024": "L",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "NC",
  "12/06/2024": "W",
  "19/06/2024": "W",
  "26/06/2024": "D1",
  "03/07/2024": "L",
  "10/07/2024": "L",
  "17/07/2024": "NC",
  "24/07/2024": "W",
  "31/07/2024": "L",
  "07/08/2024": "W",
  "14/08/2024": "",
  "21/08/2024": "L",
  "28/08/2024": "L",
  "Games Played": "14",
  "Wins": "4",
  "Draws": "2",
  "Losses": "6",
  "Total points": "14",
  "Points per game": "1.00"
  },
  {
  "Player": "Gary Purdue",
  "DOB": "01/01/1981",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "D2",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "1",
  "Wins": "0",
  "Draws": "1",
  "Losses": "0",
  "Total points": "1",
  "Points per game": "1.00"
  },
  {
  "Player": "Wes Smith",
  "DOB": "04/12/1990",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "D2",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "DNP",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "L",
  "21/08/2024": "W",
  "28/08/2024": "",
  "Games Played": "4",
  "Wins": "1",
  "Draws": "1",
  "Losses": "1",
  "Total points": "4",
  "Points per game": "1.00"
  },
  {
  "Player": "Matt Gibson",
  "DOB": "02/11/1982",
  "01/05/2024": "D1",
  "08/05/2024": "",
  "22/05/2024": "L",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "L",
  "19/06/2024": "L",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "NC",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "L",
  "14/08/2024": "W",
  "21/08/2024": "W",
  "28/08/2024": "L",
  "Games Played": "9",
  "Wins": "2",
  "Draws": "1",
  "Losses": "5",
  "Total points": "7",
  "Points per game": "0.78"
  },
  {
  "Player": "John Benson",
  "DOB": "01/08/1980",
  "01/05/2024": "",
  "08/05/2024": "L",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "NC",
  "12/06/2024": "W",
  "19/06/2024": "L",
  "26/06/2024": "D2",
  "03/07/2024": "",
  "10/07/2024": "W",
  "17/07/2024": "NC",
  "24/07/2024": "",
  "31/07/2024": "L",
  "07/08/2024": "L",
  "14/08/2024": "",
  "21/08/2024": "L",
  "28/08/2024": "",
  "Games Played": "10",
  "Wins": "2",
  "Draws": "1",
  "Losses": "5",
  "Total points": "7",
  "Points per game": "0.70"
  },
  {
  "Player": "Mike Ewen",
  "DOB": "16/05/1983",
  "01/05/2024": "D1",
  "08/05/2024": "L",
  "22/05/2024": "L",
  "29/05/2024": "",
  "05/06/2024": "NC",
  "12/06/2024": "L",
  "19/06/2024": "W",
  "26/06/2024": "D1",
  "03/07/2024": "L",
  "10/07/2024": "L",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "W",
  "14/08/2024": "L",
  "21/08/2024": "",
  "28/08/2024": "L",
  "Games Played": "12",
  "Wins": "2",
  "Draws": "2",
  "Losses": "7",
  "Total points": "8",
  "Points per game": "0.67"
  },
  {
  "Player": "Jack Sellers",
  "DOB": "",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "D1",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "L",
  "28/08/2024": "",
  "Games Played": "2",
  "Wins": "0",
  "Draws": "1",
  "Losses": "1",
  "Total points": "1",
  "Points per game": "0.50"
  },
  {
  "Player": "John Polling",
  "DOB": "07/03/1979",
  "01/05/2024": "D1",
  "08/05/2024": "",
  "22/05/2024": "L",
  "29/05/2024": "L",
  "05/06/2024": "",
  "12/06/2024": "L",
  "19/06/2024": "L",
  "26/06/2024": "D2",
  "03/07/2024": "L",
  "10/07/2024": "L",
  "17/07/2024": "NC",
  "24/07/2024": "L",
  "31/07/2024": "",
  "07/08/2024": "L",
  "14/08/2024": "W",
  "21/08/2024": "",
  "28/08/2024": "L",
  "Games Played": "13",
  "Wins": "1",
  "Draws": "2",
  "Losses": "9",
  "Total points": "5",
  "Points per game": "0.38"
  },
  {
  "Player": "Calvin Trevor",
  "DOB": "27/11/1995",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "0",
  "Wins": "0",
  "Draws": "0",
  "Losses": "0",
  "Total points": "0",
  "Points per game": "0.00"
  },
  {
  "Player": "Marc Jobling",
  "DOB": "26/06/1973",
  "01/05/2024": "",
  "08/05/2024": "L",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "L",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "2",
  "Wins": "0",
  "Draws": "0",
  "Losses": "2",
  "Total points": "0",
  "Points per game": "0.00"
  },
  {
  "Player": "Rob Goddard",
  "DOB": "15/07/1967",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "L",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "1",
  "Wins": "0",
  "Draws": "0",
  "Losses": "1",
  "Total points": "0",
  "Points per game": "0.00"
  },
  {
  "Player": "Tom O'Brien",
  "DOB": "01/04/1983",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "NC",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "1",
  "Wins": "0",
  "Draws": "0",
  "Losses": "0",
  "Total points": "0",
  "Points per game": "0.00"
  },
  {
  "Player": "Stuart Pallier",
  "DOB": "",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "L",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "",
  "28/08/2024": "",
  "Games Played": "1",
  "Wins": "0",
  "Draws": "0",
  "Losses": "1",
  "Total points": "0",
  "Points per game": "0.00"
  },
  {
  "Player": "John Cant",
  "DOB": "10/08/1990",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "L",
  "21/08/2024": "L",
  "28/08/2024": "",
  "Games Played": "2",
  "Wins": "0",
  "Draws": "0",
  "Losses": "2",
  "Total points": "0",
  "Points per game": "0.00"
  },
  {
  "Player": "Nathan Dennison",
  "DOB": "01/01/1992",
  "01/05/2024": "",
  "08/05/2024": "",
  "22/05/2024": "",
  "29/05/2024": "",
  "05/06/2024": "",
  "12/06/2024": "",
  "19/06/2024": "",
  "26/06/2024": "",
  "03/07/2024": "",
  "10/07/2024": "",
  "17/07/2024": "",
  "24/07/2024": "L",
  "31/07/2024": "",
  "07/08/2024": "",
  "14/08/2024": "",
  "21/08/2024": "W",
  "28/08/2024": "",
  "Games Played": "2",
  "Wins": "1",
  "Draws": "0",
  "Losses": "1",
  "Total points": "3",
  "Points per game": "1.50"
  },
  {
  "Player": "Total Players",
  "DOB": "",
  "01/05/2024": "26",
  "08/05/2024": "10",
  "22/05/2024": "10",
  "29/05/2024": "10",
  "05/06/2024": "10",
  "12/06/2024": "9",
  "19/06/2024": "10",
  "26/06/2024": "10",
  "03/07/2024": "10",
  "10/07/2024": "10",
  "17/07/2024": "10",
  "24/07/2024": "10",
  "31/07/2024": "10",
  "07/08/2024": "10",
  "14/08/2024": "10",
  "21/08/2024": "10",
  "28/08/2024": "10",
  "Games Played": "",
  "Wins": "",
  "Draws": "",
  "Losses": "",
  "Total points": "",
  "Points per game": ""
  },
  {
  "Player": "Goal Difference",
  "DOB": "",
  "01/05/2024": "0",
  "08/05/2024": "2",
  "22/05/2024": "2",
  "29/05/2024": "2",
  "05/06/2024": "0",
  "12/06/2024": "4",
  "19/06/2024": "1",
  "26/06/2024": "0",
  "03/07/2024": "6",
  "10/07/2024": "2",
  "17/07/2024": "0",
  "24/07/2024": "2",
  "31/07/2024": "3",
  "07/08/2024": "1",
  "14/08/2024": "8",
  "21/08/2024": "3",
  "28/08/2024": "6",
  "Games Played": "",
  "Wins": "",
  "Draws": "",
  "Losses": "",
  "Total points": "",
  "Points per game": ""
  },
  {
  "Player": "Who Picked Teams",
  "DOB": "",
  "01/05/2024": "Ash",
  "08/05/2024": "Ash",
  "22/05/2024": "Random (Mo)",
  "29/05/2024": "Potter",
  "05/06/2024": "Random (Mo)",
  "12/06/2024": "Mo",
  "19/06/2024": "Random (Jim)",
  "26/06/2024": "Ash",
  "03/07/2024": "Ewen",
  "10/07/2024": "Ash",
  "17/07/2024": "Ash",
  "24/07/2024": "Mo",
  "31/07/2024": "Ash",
  "07/08/2024": "Ash",
  "14/08/2024": "Jim",
  "21/08/2024": "Ash",
  "28/08/2024": "Ash",
  "Games Played": "",
  "Wins": "",
  "Draws": "",
  "Losses": "",
  "Total points": "",
  "Points per game": ""
  }
]

function calculateAge(dob: string | null): number | null {
  if (!dob) return null;
  const birthDate = new Date(dob.split('/').reverse().join('-'));
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getStarSign(dob: string | null): string | null {
  if (!dob) return null;
  const [day, month] = dob.split('/').map(Number);
  const zodiacSigns = [
    { name: 'Capricorn', startDate: [12, 22], endDate: [1, 19] },
    { name: 'Aquarius', startDate: [1, 20], endDate: [2, 18] },
    { name: 'Pisces', startDate: [2, 19], endDate: [3, 20] },
    { name: 'Aries', startDate: [3, 21], endDate: [4, 19] },
    { name: 'Taurus', startDate: [4, 20], endDate: [5, 20] },
    { name: 'Gemini', startDate: [5, 21], endDate: [6, 20] },
    { name: 'Cancer', startDate: [6, 21], endDate: [7, 22] },
    { name: 'Leo', startDate: [7, 23], endDate: [8, 22] },
    { name: 'Virgo', startDate: [8, 23], endDate: [9, 22] },
    { name: 'Libra', startDate: [9, 23], endDate: [10, 22] },
    { name: 'Scorpio', startDate: [10, 23], endDate: [11, 21] },
    { name: 'Sagittarius', startDate: [11, 22], endDate: [12, 21] }
  ];

  for (const sign of zodiacSigns) {
    const [startMonth, startDay] = sign.startDate;
    const [endMonth, endDay] = sign.endDate;
    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (month > startMonth && month < endMonth)
    ) {
      return sign.name;
    }
  }
  return null;
}

export async function fetchFootballData(): Promise<FootballData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const players: Player[] = []
  const matches: Match[] = []
  const processedPlayers: ProcessedPlayer[] = []
  const processedMatches: Match[] = []

  const datesToProcess = Object.keys(rawData[0]).filter(key => 
    key.match(/^\d{2}\/\d{2}\/\d{4}$/) && key !== 'DOB'
  )

  // Process players
  rawData.forEach((item, index) => {
    if (item.Player !== "Total Players" && item.Player !== "Goal Difference" && item.Player !== "Who Picked Teams") {
      const player: ProcessedPlayer = {
        Player: item.Player,
        DOB: item.DOB || null,
        Age: calculateAge(item.DOB),
        GamesPlayed: parseInt(item['Games Played']) || 0,
        Wins: parseInt(item['Wins']) || 0,
        Draws: parseInt(item['Draws']) || 0,
        Losses: parseInt(item['Losses']) || 0,
        TotalPoints: parseInt(item['Total points']) || 0,
        PointsPerGame: parseFloat(item['Points per game']) || 0,
        StarSign: getStarSign(item.DOB)
      }
      processedPlayers.push(player)

      // Keeping the original player structure for backwards compatibility
      players.push({
        id: index.toString(),
        name: item.Player,
        played: player.GamesPlayed,
        won: player.Wins,
        drawn: player.Draws,
        lost: player.Losses,
        points: player.TotalPoints,
        pointsPerGame: player.PointsPerGame,
        starSign: player.StarSign
      })
    }
  })

  // Process matches
  datesToProcess.forEach(date => {
    const teamA: string[] = []
    const teamB: string[] = []
    let actualPlayerCount = 0
    let abandoned = true

    rawData.forEach(item => {
      if (item.Player !== "Total Players" && item.Player !== "Goal Difference" && item.Player !== "Who Picked Teams") {
        if (item[date] === 'W' || item[date] === 'D1') {
          teamA.push(item.Player)
          actualPlayerCount++
          abandoned = false
        } else if (item[date] === 'L' || item[date] === 'D2') {
          teamB.push(item.Player)
          actualPlayerCount++
          abandoned = false
        }
      }
    })

    const goalDifferenceRow = rawData.find(row => row.Player === "Goal Difference")
    const whoPickedTeamsRow = rawData.find(row => row.Player === "Who Picked Teams")

    const match: Match = {
      id: date,
      date: date,
      teamA: teamA,
      teamB: teamB,
      TotalPlayers: actualPlayerCount,
      GoalDifference: goalDifferenceRow ? parseInt(goalDifferenceRow[date]) || 0 : 0,
      WhoPickedTeams: whoPickedTeamsRow ? whoPickedTeamsRow[date] : '',
      abandoned: abandoned
    }

    processedMatches.push(match)
    matches.push(match)  // Keeping the original matches array for backwards compatibility
  })

  return {
    players: players,
    matches: matches,
    processedPlayers: processedPlayers,
    processedMatches: processedMatches,
    rawData: rawData
  }
}
# Yahtzee
***Yahtzee*** is a dice game where players roll five dice to score combinations on a scorecard over 13 rounds. 

>Players have up to three rolls per turn to try and achieve specific **scoring categories**, such as three-of-a-kind, a full house, or the highest-scoring combination, a "Yahtzee" (five dice with the same number). **The player with the highest total score after 13 rounds wins**. 

![Yahtzee Game Screenshot](/Imgs/webpageyahtzee.png)

#### Technologies Used: 
---

- JavaScript: A variety of function were created to handle different parts of the logic necessary for this game e.g. 
```javascript
rollDice() , holdDice(), scoreSection(), updateDisplay(), etc.
```
- HTML: This was a key technology during the scheming phase for the project, giving a visual grid to work with, but also a  live document during all the phases due to the high DOM manipulation necessary to select specific elements, create and remove classes, handling events, styling elements (dice) and more. e.g.

```html
 <tbody>
    <tr><td>Ones</td><td data-type-score="ones" class="p1" ></td><td data-type-score="ones" class="p2"></td></tr>
    <tr><td>Twos</td><td data-type-score="twos" class="p1"></td><td data-type-score="twos" class="p2"></td></tr>
...        
</tbody>
```

- CSS: CSS was crucial to define the style of the elements (dice) and give life to the layout of the game. The most challenging, but also a great learning experience, was to manipulate the result of the ```Math.random()``` method and create the pips (dots) for the dice. Here is the code snippet for that process, which involved using Flexbox (dice container) and Grid Templates (to map the die) and bring it to life.

```css
#dice-container {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100px;
}
.die{
    width: 80px;
    height: 80px;
    background-color:white;
    border: 2px solid black;
    border-radius: 25px;
    font-weight: bold;
    display: grid;
    grid-template-columns: repeat(3, 1fr) ;
    grid-template-rows: repeat(3, 1fr);
    padding:10px

}
.dot {
    width: 10px;
    height: 10px;
    background: #111;
    border-radius: 50%;
    justify-self: center;
    align-self: center;
    display: none; hidden by default; face classes show certain pips
}

.top-left {
    grid-area: 1/1/2/2; 
}
.top-center{
    grid-area: 1/2/2/3; 
}
....
```
##### Resources
---
- [MDN-Data Attributes/ Dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).

- [Grid templates for dice](https://dev.to/ekeijl/creating-dice-using-css-grid-j4).

- [w3school](https://www.w3schools.com/)


### Lets Play
---
Check out the following link to play and have fun with one of your friends (or with you alter ego character) [Yahtzee Game](https://jsagast.github.io/Yahtzee-Project/)

Yahtzee  :rocket::boom:
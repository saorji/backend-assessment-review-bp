const goalAdvice = [
  {
    goalId: 1,
    category: "spirituality",
    advice: `"Compassion refers to the arising in the heart of the desire to relieve the suffering of all beings." Baba Ram Dass`,
  },
  {
    goalId: 2,
    category: "finance",
    advice: `Wealth consists not in having great possessions, but in having few wants. --Epictetus`,
  },
  {
    goalId: 3,
    category: "sports",
    advice: `”It ain't about how hard you can hit. It's about how hard you can get hit, and keep moving forward.” Sylvester Stalone`,
  },
  {
    goalId: 4,
    category: "creative",
    advice: `"Everything you can imagine is real." -- Pablo Picasso`,
  },
  {
    goalId: 5,
    category: "coding",
    advice: `“Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.” - Dan Salomon`,
  },
];

let globalId = 6;

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },
  getAdviceByCategory: (req, res) => {
    const { category } = req.query;
    const adviceToSend = goalAdvice.find((goal) => goal.category === category);
    if (adviceToSend) {
      return res.status(200).send(adviceToSend);
    }
    return res.status(400).send(`try a different category`);
  },
  postAdvice: (req, res) => {
    const { category, advice } = req.body;
    const newObj = {
      goalId: globalId,
      category,
      advice,
    };
    goalAdvice.push(newObj)
    res.status(200).send(goalAdvice[goalAdvice.length-1])
  },
  deleteAdvice:(req,res) => {
    const {category} = req.params
    const foundIndex = goalAdvice.findIndex((goal) => goal.category === category);
    if(foundIndex !== -1){
      goalAdvice.splice(foundIndex,1)
      res.status(200).send(`advice deleted`)
      return
    }
    res.status(400).send(`something went wrong, try again!`)
  }
};

const express = require('express');
const cors = require('cors');
const Sentiment = require('sentiment');

const app = express();
const sentiment = new Sentiment();

app.use(cors());
app.use(express.json());

app.post('/api/senti', (req,res) =>{
    const text = req.body.text;
    if(!text) {
        return res.status(400).json({error: 'text is required'});

    }
    const result = sentiment.analyze(text);
    console.log('word:'+result.words);
    
    console.log('positiv--'+result.positive);
     console.log('negative--'+result.negative);

    const score = Number(result.score);
    let sentimentLabel = 'neutral';

    if(score > 0){
        sentimentLabel='positive';
    }else if(score < 0){
        sentimentLabel = 'negative';
    }else {
        sentimentLabel = 'neutral';
    }

    res.json({sentiment: sentimentLabel, score: result.score})
});



const port = 5000;
app.listen(port, ()=>{
    console.log('Server running on 5000 port')
});

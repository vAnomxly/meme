import React,{Component} from "react"
import './style.css';

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state = {
            topText:"",
            bottomText:"",
            imageURL:"http://i.imgflip.com/1bij.jpg",
            allMemeImgs:[]
        }
        
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                console.log(memes[0])
                this.setState({allMemeImgs:memes})
            })
        this.handleChange = this.handleChange.bind(this)
        this.newMeme = this.newMeme.bind(this)
    }
    handleChange(event){
        const {type, name, value, checked} = event.target
        this.setState({
            [name]:value
            })
        
    }
    newMeme(){
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ imageURL: randMemeImg})
    }
    
    render(){
    return(
        <div id="contain">
            <form>
                <input 
                onChange={this.handleChange}
                name="topText" 
                type="text" 
                value={this.state.topText} 
                placeholder="Top Text"/>
                
                <br />
                
                <input 
                onChange={this.handleChange}
                name="bottomText" 
                type="text" 
                value={this.state.bottomText} 
                placeholder="Bottom Text"/>
                
                <br />
                <button type="button" onClick={this.newMeme}>Generate</button>
            </form>
            <div id="contain">
                <img className="meme" src={this.state.imageURL} alt="" />
                <h2 className="top">{this.state.topText}</h2>
                <h2 className="bottom">{this.state.bottomText}</h2>
            </div>
        </div>
    )
    
}
}

export default MemeGenerator
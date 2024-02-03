import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import titleCat from './images/titleCat.gif';
import loadingCat from './images/loadingCat.gif';
import OpenAI from "openai";

function App() {

  const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const [journalEntry, setJournalEntry] = useState('');
  const [entryToImagine, setUsedEntry] = useState('');
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageExists, setImageExists] = useState(false);
  const [imageURL, setImageURL] = useState('');

  async function generateDescription(entry) {
    const response = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "Given a journal entry, your job is to create a detailed but concise visual description of a \
      humorous image that captures the sentiment of the following journal and uses cats as the main character(s) and no humans. \
      This is the journal entry: " + entry + "\""}],
      model: "gpt-3.5-turbo",
    });
    console.log('[SUCCESS] Generated Image Creation Prompt');
    return response.choices[0].message.content;
  }


  async function generateImageFromDescription(description) {
      const imageResponse = await openai.images.generate({ model: "dall-e-3", prompt:'No Humans, Only cats, One cat, Cute, Funny, ' + description});
      const URLResponse = imageResponse.data[0].url; // This returns the URL of the generated image
      setImageURL(URLResponse);
      setImageExists(true);
      console.log('[SUCCESS] Generated Image URL');
  }

  async function entryToImage(entry) {
    setIsLoading(true);
    try { 
      const generatedDescription = await generateDescription(entry).then(
        (URLResponse) => generateImageFromDescription(URLResponse)
      );
    } catch (error) {
      console.error("Error generating cute cat image sry :(", error);
    } finally { 
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    if (entryToImagine !== '') {
      entryToImage(entryToImagine);
    } else {
      setImageExists(false);
    }
    setUsedEntry('');
  }, [entryToImagine])

  const handleDownload = () => {
    const blob = new Blob([journalEntry], { type: 'text/plain' });
    const link = document.createElement('a');
    const objectURL = URL.createObjectURL(blob);

    link.href = objectURL;
    link.download = 'journalEntry.txt';

    document.body.appendChild(link);

    link.click();

    URL.revokeObjectURL(objectURL);

    document.body.removeChild(link);
  };

  const handleClear = () => {
    setJournalEntry("");
  }

  const openHelpModal = () => {
    setHelpModalOpen(true);
  }

  const closeHelpModal = () => {
    setHelpModalOpen(false);
  }

  const handleImagine = () => {
    setUsedEntry(journalEntry);
    console.log('[SUCCESS] Imagine Started')
  }

  return (
    <div>
    {isHelpModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="rightAlign" onClick={closeHelpModal}>
            <span className='close'>
              &times;
            </span>
          </span>
          <p className="leftSide helpContent">PawsAndReflect helps to encourage journaling by generating a funny image of a cat based on the journal entry the user inputs. 
          Simply type into the text box and hit the "Imagine" button to watch your journal entry come to life!</p>
        </div>
      </div>
    )}
    <div className="container-fluid">
      <div className="row">
        <div className='Title col-md-12'>
            <img src={titleCat} height="45rem"/>
            PawsAndReflect
            <img src={titleCat} height="45rem"/>
        </div>

      </div>
      <div className="row">
        <div className='col-md-5'>
          <div className='containerGreen container leftSide'>
            {!imageExists && !isLoading && 
            <div className='imageContainer'>
              <span style={{paddingLeft: 10, paddingRight: 10}}>Hit "Imagine" to generate an image.</span>
            </div>}
            {imageExists && !isLoading && 
              <img src={imageURL} alt="Journal Entry Image" class="responsiveImage"/> }
            {isLoading && 
            <div className='imageContainer' id="loadingCatContainer">
              <img src={loadingCat} id="loadingCat" height="200rem"/>
            </div>}
          </div>
        </div>
        <div className='col-md-5'>
          <div className='containerGreen container'>
              <textarea type="text" id="journal" rows="20" value={journalEntry} onChange={(e) => setJournalEntry(e.target.value)} style={{fontSize: 16}} /><br></br>
              <div class="right">
                <input type="submit" className="submit-button" value="Imagine" onClick={handleImagine}/>
              </div>
          </div>
        </div>
        <div className='col-md-2'>
          <div className='containerGreen container leftSide'>
              <button className="menu-button" onClick={handleDownload}>Download Entry</button><br></br>
              <button className="menu-button" onClick={handleClear}>Clear Text</button><br></br>
              <button className="menu-button" onClick={openHelpModal}>Help</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;

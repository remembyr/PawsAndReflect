import './App.css';
import React, { useState } from 'react';

function App() {

  const [journalEntry, setJournalEntry] = useState('');
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

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
    alert('Code this thing first')
    //code here
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
          PawsAndReflect
        </div>
      </div>
      <div className="row">
        <div className='col-md-5'>
          <div className='containerGreen container leftSide'>
            <div className='imageContainer'>
              <span style={{paddingLeft: 10, paddingRight: 10}}>Hit "Imagine" to generate an image.</span>
            </div>
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
              <button className="menu-button" onClick={handleClear}>Clear All</button><br></br>
              <button className="menu-button" onClick={openHelpModal}>Help</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;

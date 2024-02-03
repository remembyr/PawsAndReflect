import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [journalEntry, setJournalEntry] = useState('');
  const [usedEntry, setUsedEntry] = useState('');
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageExists, setImageExists] = useState(false);
  const [imageURL, setImageURL] = useState('');
    

  useEffect(()=>{
    if (usedEntry !== '') {
      
      query({"inputs": {usedEntry}}).then((response) => {
        // Use image
        setImageURL(URL.createObjectURL(response));
        console.log(URL.createObjectURL(response));
      });

    } else {
      setImageExists(false);
    }

  }, [usedEntry])

  async function query(data) {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/openskyml/dalle-3-xl",
        {
          headers: { Authorization: "Bearer {API_TOKEN}" },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      setImageExists(true);
      return result;
    } catch (error) {
      console.error("Error fetching image");
    } finally { 
      setIsLoading(false);
    }
  }

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
            <img src="https://ci3.googleusercontent.com/mail-img-att/APrP3qFOw75SBEFTNhTbQr44yuPza8tqryqTn7BzikFflNs0wVBk4UDpzxiODqr5fpE8rxhHTG0YoEyse7bSeI671-pVvgQwpQDxV1E8dLCTrcWhyDnll-onb92BdQigQi_mJMLh3CHnFHoweHeUNtFQHE0HoIV-MMfipaDp44QN4m_RuNLovEvoFqDPtaKd4H3qSDgpOizDUYCSlrQwAkgdqmHILw-6fGiYe33eegBZ3GKonKgG7OUxSGcxYph4Ejwuln-C4CNh7vpFa1QJjCFbkmtVYr1eCeLk3Xopu1UQGAqwOxwkHLsns94U_h-v0spRJh6q1SAI5YvNwalc05JL76SAMHBMdCKSfnfLult8tbFo-LGCuaZ9iUszW4yjKX6d6bKv9RxpUx-RA8iX7nNlaFnr26JoVV-lPrnvpHnddqRsmk_jUrcwYMbanf-5XhT-jSQEx2I4o79p9dddjm4zXKAmtaYK1vma3x7Rek8z9Bdjjhv2QyodcU-pPPmaatjTlsvFJIRvfJmWEuumAOCX3bP-m2Rl1l58N4inKTD9GqZs0iVXs7iD6oYhOXsn_PlOGDpYo2VTUsUwBkJfrCxHwTvp0M9uLz3v3OGpg8g0B3a8N4gjY_JkgDez1VKEm-Uc3ZWiSPPywblGt315Cm3CM8ZuCuAKZ1awjXNWWKP1TEc-KnRTr0toaLY9Crd4ZnK3A_hxYTiIqY7witdG0FT3hUmX91dLx14PYsYa-j_FHPb6arDVUn5I6Z-Pvep38XJQ2PFdzLeUdohIiIlDRavP0jZXNhNQsNoAhPaKU4Q2X6a1nuhB_63BHxWP2ezzjrQYQ7Yla23FbGxYmsJrDLVOfgJ1p2xfj6dNLycELNW4Q0eWdPvJSoiZhcrBZINbpXsvLiFcCZW1sxS8_cudnxpR-9NH_1N3sIQ9ah2Wz_OXrdh4UMLi6MMWLK4wXZLcqdWoy4n08UkCxS8yZDFzC86nmZBJHzxFVNGomIhlF1HPD4iYewFXyJKcjC5efFi3QN7-Ru9i-GXiZGa8uErS6YNHSB2naCwKQzbFvRRPrb-74aVmktYFA8Qlpg=s0-l75-ft" height="45rem"/>
            PawsAndReflect
            <img src="https://ci3.googleusercontent.com/mail-img-att/APrP3qFOw75SBEFTNhTbQr44yuPza8tqryqTn7BzikFflNs0wVBk4UDpzxiODqr5fpE8rxhHTG0YoEyse7bSeI671-pVvgQwpQDxV1E8dLCTrcWhyDnll-onb92BdQigQi_mJMLh3CHnFHoweHeUNtFQHE0HoIV-MMfipaDp44QN4m_RuNLovEvoFqDPtaKd4H3qSDgpOizDUYCSlrQwAkgdqmHILw-6fGiYe33eegBZ3GKonKgG7OUxSGcxYph4Ejwuln-C4CNh7vpFa1QJjCFbkmtVYr1eCeLk3Xopu1UQGAqwOxwkHLsns94U_h-v0spRJh6q1SAI5YvNwalc05JL76SAMHBMdCKSfnfLult8tbFo-LGCuaZ9iUszW4yjKX6d6bKv9RxpUx-RA8iX7nNlaFnr26JoVV-lPrnvpHnddqRsmk_jUrcwYMbanf-5XhT-jSQEx2I4o79p9dddjm4zXKAmtaYK1vma3x7Rek8z9Bdjjhv2QyodcU-pPPmaatjTlsvFJIRvfJmWEuumAOCX3bP-m2Rl1l58N4inKTD9GqZs0iVXs7iD6oYhOXsn_PlOGDpYo2VTUsUwBkJfrCxHwTvp0M9uLz3v3OGpg8g0B3a8N4gjY_JkgDez1VKEm-Uc3ZWiSPPywblGt315Cm3CM8ZuCuAKZ1awjXNWWKP1TEc-KnRTr0toaLY9Crd4ZnK3A_hxYTiIqY7witdG0FT3hUmX91dLx14PYsYa-j_FHPb6arDVUn5I6Z-Pvep38XJQ2PFdzLeUdohIiIlDRavP0jZXNhNQsNoAhPaKU4Q2X6a1nuhB_63BHxWP2ezzjrQYQ7Yla23FbGxYmsJrDLVOfgJ1p2xfj6dNLycELNW4Q0eWdPvJSoiZhcrBZINbpXsvLiFcCZW1sxS8_cudnxpR-9NH_1N3sIQ9ah2Wz_OXrdh4UMLi6MMWLK4wXZLcqdWoy4n08UkCxS8yZDFzC86nmZBJHzxFVNGomIhlF1HPD4iYewFXyJKcjC5efFi3QN7-Ru9i-GXiZGa8uErS6YNHSB2naCwKQzbFvRRPrb-74aVmktYFA8Qlpg=s0-l75-ft" height="45rem"/>
        </div>

      </div>
      <div className="row">
        <div className='col-md-5'>
          <div className='containerGreen container leftSide'>
          {(imageExists && !isLoading) ? 
            <img src={imageURL} alt="Journal Entry Image"/> : 
            <div className='imageContainer'>
              <span style={{paddingLeft: 10, paddingRight: 10}}>Hit "Imagine" to generate an image.</span>
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

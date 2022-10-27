import {useCallback} from 'react'

function useHttp(){
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        
        try {
          const response = await fetch(requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          });
    
          if (!response.ok) {
            alert('Request failed!');
          }
    
          const data = await response.json();
          applyData(data);
        } catch (err) {
          alert(err.message || 'Something went wrong!');
        }
        
      }, []);

    return {sendRequest}
}

export default useHttp;
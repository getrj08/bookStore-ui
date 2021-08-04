import { makeStyles } from '@material-ui/core/styles';

const useBookStyles = makeStyles({
    rootContainer : {
        marginTop : 50
    },
    rootCard: {
      maxWidth: 300
    },
    rootButton: {
        marginTop: '10px',
        marginLeft: '20px'
        
    },
    rootHeader : {
       textAlign : 'center'
    },
    media: {
        width: '150px',
        height: '200px',
        margin: 'auto'
    },
  });

export default useBookStyles

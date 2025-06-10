// frontend/StyleSheet.js
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 20,
  },
  content: { 
    flex: 1, 
  },
  text: { 
    marginBottom: 8 
  },
  savedText: {
    fontSize: 16,
    marginVertical: 4,
    paddingLeft: 10,
  },
  errorText: { 
    color: 'red', 
    marginBottom: 10, 
    paddingLeft: 8 
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  button: {
    marginVertical: 8,
    marginHorizontal: 10,
  },
  buttonContainerBottom: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  status: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007700',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default globalStyles;
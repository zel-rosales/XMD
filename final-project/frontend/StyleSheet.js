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
    backgroundColor: "#fff",
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
  cardList: {
    padding: 8,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    margin: 4,
    flexBasis: '48%', // ensures two per row with margin
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
  tagContainer: {
    marginTop: 10,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 12,
    overflow: 'hidden',
    color: '#fff',
  },
  ownedTag: {
    backgroundColor: '#4CAF50', // green
  },
  isoTag: {
    backgroundColor: '#FF9800', // orange
  },
});

export default globalStyles;
import PropTypes from 'prop-types'
// import Navigaton from './Navigation';
import { Web3 } from 'web3';
import ABI from './ABI.json'
import { useNavigate } from 'react-router-dom';
const Wallet = ({ saveState }) => {
    const navigateto = useNavigate();
    const connectWallet = async () => {

        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                })
                const contractAddress = '0x0a0fc1c3b7eb4452d63fb914db9c7862291d6b76';
                const contract = new web3.eth.Contract(ABI, contractAddress);
                saveState({ web3: web3, contract: contract, account: accounts[0] })
                navigateto("/view-all-Task")
                // console.log(contract);

                // console.log(web3, accounts)
            } else {
                throw new Error;
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            {/* <Navigaton /> */}
            <button onClick={connectWallet}> Connect Wallet</button>
        </>
    )
}
Wallet.propTypes = {
    saveState: PropTypes.func.isRequired,
};

export default Wallet
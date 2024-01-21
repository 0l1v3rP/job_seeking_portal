import React from 'react';
import { useState, useEffect } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import { companyStatusEnum } from '../../utils/constants/companyStatus';
import CreateJobOffer from '../../modals/CreateJobOffer';

function ControlTab({ companyStatus, selectedTab, setSelectedTab, setRefresh }) {
  const [showCreateJob, setCreateJob] = useState(false);
  const openShowCreateJob = () => setCreateJob(true);
  const closeShowCreateJob = () => setCreateJob(false);

  return (
    <>
      <div style={{paddingTop:20, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tabs
          activeKey={selectedTab}
          id="controlTab"
          className="mb-3 tabs"
          fill
          onSelect={setSelectedTab}
        >
          <Tab eventKey="myJobs" title="My Applications" />
          {companyStatus !== companyStatusEnum.NONE &&  
              <Tab eventKey="company" title="Company Jobs" />
          }
        </Tabs>
        {selectedTab === 'company' &&  
          <Button variant="primary" onClick={openShowCreateJob} style={{marginBottom:15}}>
            Create Job
          </Button>
        }
      </div>
      {showCreateJob && <CreateJobOffer handleClose={closeShowCreateJob} setRefresh={setRefresh}/>}
    </>
  );
}

export default ControlTab;
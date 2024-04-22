import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ROUTES from './route';

const notFoundImg = require('../assets/images/notfound.gif');

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="p-5 row">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <Card.Img width={200} src={notFoundImg} />
                </div>
                <div className="col-12 col-md-6 mt-0 mb-0">
                  <h4 className="text-muted text-center mb-4">{t('fetchErrors.notfoundPage')}</h4>
                  <p className="text-muted text-center mb-4">
                    {t('userDirection')}
                    <a href={ROUTES.home}>{t('buttons.mainPageLink')}</a>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import requests
import threading
import sys
import json


session = requests.Session()
timeout = 5

def scan(url: str, path: str, arr: list):
    global session, timeout
    full_url = url + '/' + path
    try:
        res = session.get(full_url, timeout=timeout)
        if res.status_code == 200:
            arr.append(full_url)
    except requests.exceptions.RequestException:
        pass


def run_scan(url: str, keywords: list, arr: list):
    threads = []
    for keyword in keywords:
        thread = threading.Thread(target=scan, args=(url, keyword, arr,))
        threads.append(thread)
        thread.daemon = True
        thread.start()

    for thread in threads:
        thread.join()


if __name__ == '__main__':
    aboutLinks = []
    contactLinks = []

    about_keywords = ['company', 'about', 'about-us', 'our-story', 'who-we-are', 'mission', 'vision', 'team', 'leadership', 'history', 'founders', 'values', 'culture', 'philosophy', 'purpose', 'background', 'overview', 'mission-and-vision', 'meet-the-team', 'about-company', 'about-our-team', 'our-mission', 'our-vision', 'our-history', 'our-leadership', 'our-values', 'our-culture', 'our-philosophy', 'our-purpose', 'company-background', 'company-overview', 'team-members', 'about-our-company', 'about-our-mission', 'about-our-vision', 'about-our-history', 'about-our-leadership', 'about-our-values', 'about-our-culture', 'about-our-philosophy', 'about-our-purpose', 'about-our-team-members', 'about-the-company', 'about-the-team', 'our-company', 'our-team', 'our-mission-and-vision', 'our-history-and-background', 'our-leadership-team', 'our-core-values', 'our-company-culture', 'our-philosophy-and-values', 'our-team-membership', 'about-our-company-mission', 'about-our-company-vision', 'about-our-company-history', 'about-our-company-leadership', 'about-our-company-values', 'about-our-company-culture',
                      'about-our-company-philosophy', 'about-our-company-purpose', 'about-our-company-team-members', 'about-the-company-mission', 'about-the-company-vision', 'about-the-company-history', 'about-the-company-leadership', 'about-the-company-values', 'about-the-company-culture', 'about-the-company-philosophy', 'about-the-company-purpose', 'about-the-company-team-members', 'about-uscompany', 'about-usteam', 'about-usmission', 'about-usvision', 'about-ushistory', 'about-usleadership', 'about-usvalues', 'about-usculture', 'about-usphilosophy', 'about-uspurpose', 'about-usbackground', 'about-usoverview', 'about-usmission-and-vision', 'about-usmeet-the-team', 'about-uscompany-background', 'about-uscompany-overview', 'about-usteam-members', 'about-usour-company', 'about-usour-team', 'about-usour-mission-and-vision', 'about-usour-history-and-background', 'about-usour-leadership-team', 'about-usour-core-values', 'about-usour-company-culture', 'about-usour-philosophy-and-values', 'about-usour-team-membership', 'about-usour-company-mission', 'about-usour-company-vision', 'about-usour-company-history']
    contact_keywords = ['company', 'contact-us', 'contact', 'contactus', 'get-in-touch', 'support/contact-us', 'about/contact-us', 'company/contact', 'help/contact-us', 'customer-service/contact-us', 'reach-out', 'connect-with-us', 'contact-information', 'contact-form', 'contact-our-team', 'contact-sales', 'contact-support', 'contact-customer-service', 'contact-website-name', 'contact-us-page', 'contact-email', 'contact-phone-number', 'contact-address', 'contact-feedback', 'contact-inquiry', 'contact-enquiry', 'contact-questions', 'contact-suggestions', 'contact-comments', 'contact-booking', 'contact-appointment', 'contact-careers', 'contact-media', 'contact-press', 'contact-investor-relations', 'contact-partnerships', 'contact-donations', 'contact-privacy', 'contact-terms-of-service', 'contact-report-abuse', 'contact-advertising', 'contact-technical-support', 'contact-emergency', 'contact-sales-team', 'contact-support-team', 'contact-customer-service-team', 'contact-media-relations', 'contact-press-inquiries', 'contact-business-development', 'contact-hr', 'contact-human-resources', 'contact-marketing', 'contact-social-media', 'contact-product-feedback', 'contact-webmaster', 'contact-administration', 'contact-legal',
                        'contact-licensing', 'contact-pricing', 'contact-returns', 'contact-exchanges', 'contact-refunds', 'contact-order-status', 'contact-shipping', 'contact-delivery', 'contact-accounts', 'contact-billing', 'contact-subscriptions', 'contact-support-ticket', 'contact-live-chat', 'contact-help-center', 'contact-faq', 'contact-technical-assistance', 'contact-service-request', 'contact-service-appointment', 'contact-service-inquiry', 'contact-service-support', 'contact-service-feedback', 'contact-service-complaints', 'contact-service-suggestions', 'contact-service-comments', 'contact-service-booking', 'contact-service-sales', 'contact-service-customer-service', 'contact-service-support-team', 'contact-service-media-relations', 'contact-service-press-inquiries', 'contact-service-business-development', 'contact-service-marketing', 'contact-service-social-media', 'contact-service-product-feedback', 'contact-service-webmaster', 'contact-service-administration', 'contact-service-legal', 'contact-service-licensing', 'contact-service-pricing', 'contact-service-returns', 'contact-service-exchanges', 'contact-service-refunds', 'contact-service-order-status', 'contact-service-shipping', 'contact-service-accounts']

    url = sys.argv[1]
    run_scan(url, about_keywords, aboutLinks)
    run_scan(url, contact_keywords, contactLinks)

    json.dump({'aboutLinks': aboutLinks, 'contactLinks': contactLinks}, sys.stdout)
    sys.stdout.flush()
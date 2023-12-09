import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  public lstFiles: any[];
  public searchFilterList: any[];
  public lstFileList: any[];
  public lstSearchList: any[];
  constructor() { }

  ngOnInit() {
    this.lstFiles = [
      { id: 1, name: 'All Projects' },
      { id: 2, name: 'Office Management' },
      { id: 3, name: 'Video Calling App' },
      { id: 4, name: 'Hospital Administration' },
      { id: 5, name: 'Virtual Host' }
    ]
    this.searchFilterList = [
      { id: 1, name: 'All Projects' },
      { id: 2, name: 'Office Management' },
      { id: 3, name: 'Video Calling App' },
      { id: 4, name: 'Hospital Administration' },
      { id: 5, name: 'Virtual Host' }
    ]
    this.lstFileList = [
      {
        id: 1, name: 'Sample.pdf', size: '10.45kb', last_modified: '1 min ago'
      },
      {
        id: 2, name: 'Documents.pdf', size: '22.67kb', last_modified: '2 min ago'
      },
      {
        id: 3, name: 'icons.pdf', size: '25.45kb', last_modified: '5 min ago'
      },
      {
        id: 4, name: 'User.xls', size: '25.1kb', last_modified: '15 min ago'
      },
      {
        id: 5, name: 'Update.pdf', size: '32.25kb', last_modified: '14-Aug-2020'
      },
      {
        id: 6, name: 'Vision.pdf', size: '14.45kb', last_modified: '30 min ago'
      },
      {
        id: 7, name: 'Voice.pdf', size: '35.4kb', last_modified: '5 min ago'
      },
      {
        id: 8, name: 'Tutorials.docs', size: '48.07kb', last_modified: '19 min ago'
      },
      {
        id: 9, name: 'Music.mp3', size: '10.45kb', last_modified: '18 min ago'
      },
      {
        id: 10, name: 'index.html', size: '49.13kb', last_modified: '24-Sep-2020'
      },
      {
        id: 11, name: 'Installation.pdf', size: '10.45kb', last_modified: '69 min ago'
      },
      {
        id: 12, name: 'Page.pdf', size: '10.45kb', last_modified: '45 min ago'
      }

    ]
    this.lstSearchList = [
      {
        id: 1, name: 'Sample.pdf', size: '10.45kb', last_modified: '1 min ago'
      },
      {
        id: 2, name: 'Documents.pdf', size: '22.67kb', last_modified: '2 min ago'
      },
      {
        id: 3, name: 'icons.pdf', size: '25.45kb', last_modified: '5 min ago'
      },
      {
        id: 4, name: 'User.xls', size: '25.1kb', last_modified: '15 min ago'
      },
      {
        id: 5, name: 'Update.pdf', size: '32.25kb', last_modified: '14-Aug-2020'
      },
      {
        id: 6, name: 'Vision.pdf', size: '14.45kb', last_modified: '30 min ago'
      },
      {
        id: 7, name: 'Voice.pdf', size: '35.4kb', last_modified: '5 min ago'
      },
      {
        id: 8, name: 'Tutorials.docs', size: '48.07kb', last_modified: '19 min ago'
      },
      {
        id: 9, name: 'Music.mp3', size: '10.45kb', last_modified: '18 min ago'
      },
      {
        id: 10, name: 'index.html', size: '49.13kb', last_modified: '24-Sep-2020'
      },
      {
        id: 11, name: 'Installation.pdf', size: '10.45kb', last_modified: '69 min ago'
      },
      {
        id: 12, name: 'Page.pdf', size: '10.45kb', last_modified: '45 min ago'
      }

    ]
    $(document).on('click', '#file_sidebar_toggle', function () {
      $('.file-wrap').toggleClass('file-sidebar-toggle');
    });

    $(document).on('click', '.file-side-close', function () {
      $('.file-wrap').removeClass('file-sidebar-toggle');
    });

  }

  // search filter in files name
  searchBName(searchValue: string) {
    this.searchFilterList = this.lstFiles.filter(res => {
      return res.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }


  // search filter in files and docs
  searchText(searchValue: string) {
    this.lstSearchList = this.lstFileList.filter(res => {
      return res.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }
}
